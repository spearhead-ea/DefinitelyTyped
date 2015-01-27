// Type definitions for vertex 0.0.3
// Project: https://github.com/wokim/vertex
// Definitions by: Wonshik Kim <https://github.com/wokim/>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

/// <reference path="../bluebird/bluebird.d.ts" />
/// <reference path="../mongoose/mongoose.d.ts" />
/// <reference path="../redis/redis.d.ts" />
/// <reference path="../restify/restify.d.ts" />
/// <reference path="../amqplib/amqplib.d.ts" />
/// <reference path="../socket.io/socket.io.d.ts" />

declare module "vertex" {
  import Promise = require('bluebird');
  import mongoose = require('mongoose');
  import redis = require('redis');
  import restify = require('restify');
  import amqp = require('amqplib/callback_api');
  import io = require('socket.io');

  export interface AMQPAdapterOptions {
      url: string;
      socketOptions?: amqp.SocketOptions;
  }

  export interface MongooseAdapterOptions {
    uri: string;
    connectionOption?: mongoose.ConnectionOption;
  }

  export interface RedisAdapterOptions {
    port: number;
    host: string;
    clientOpts?: redis.ClientOpts;
  }

  export interface RestifyAdapterOptions {
    serverOptions?: restify.ServerOptions;
    store: ISessionStore;
    port: number;
    secret: string;
  }

  export interface ISessionStore {
    getSession(sid: string): Promise<any>;
    setSession(sid: string, session: any): Promise<any>;
    deleteSession(sid: string): Promise<void>;
  }
  
  export interface SocketIOAdapterOptions {
    port: number;
  }

  /**
   * ServiceOptions
   * @interface
   */
  export interface ServiceOptions {
    mongoose?: MongooseAdapterOptions;
    redis?: RedisAdapterOptions;
    restify?: RestifyAdapterOptions;
    amqp?: AMQPAdapterOptions;
    socketio?: SocketIOAdapterOptions;
  }

  /**
   * IAbstractAdapter
   * @interface
   */
  export interface IAbstractAdapter {
    adaptee: any;
    initialize(): Promise<void>;
  }

  /**
   * IListenableAdapter
   * @interface
   */
  export interface IListenableAdapter extends IAbstractAdapter {
    listen(): Promise<void>;
  }

  /**
   * Abstract adapter class for back-end service.
   * @abstract
   * @class
   * @implements IAbstractAdapter
   */
  export class AbstractAdapter<T, U> implements IAbstractAdapter {
    protected _adaptee: T;
    protected _options: U;
    adaptee: T;
    protected options: U;
    constructor(options?: U);
    /**
     * @abstract
     * @returns {Promise<any>}
     */
    initialize(): Promise<void>;
  }

  /**
   * Abstract adapter class for back-end service.
   * @abstract
   * @class
   * @extends AbstractAdapter
   * @implements IListenableAdapter
   */
  export class ListenableAdapter<T, U> extends AbstractAdapter<T, U> implements IListenableAdapter {
    private _controllers;
    /**
     * @param {AbstractController} Class
     */
    addController(Class: typeof AbstractController): void;
    /**
     * @returns {Promise<void>}
     * @final
     */
    postInitialize(): void;
    /**
     * @abstract
     * @returns {Promise<void>}
     */
    listen(): Promise<void>;
  }

  export class AMQPAdapter extends AbstractAdapter<amqp.Channel, AMQPAdapterOptions> {
    /**
     * @returns {Promise<void>}
     * @override
     */
    initialize(): Promise<void>;
  }

  /**
   * MongooseAdapterType
   * @interface
   */
  export interface MongooseAdapterType {
    connection: mongoose.Connection;
    schemaClass: typeof mongoose.Schema;
  }

  /**
   * MongooseAdapter
   * @class
   * @extends AbstractAdapter<T>
   */
  export class MongooseAdapter extends AbstractAdapter<MongooseAdapterType, MongooseAdapterOptions> {
    /**
     * Initialize the mongoose connection.
     * @returns {Promise<void>}
     * @override
     */
    initialize(): Promise<void>;
  }

  /**
   * RedisConnectionAdapter
   * @class
   * @extends AbstractAdapter<T>
   */
  export class RedisConnectionAdapter extends AbstractAdapter<redis.RedisClient, RedisAdapterOptions> {
    /**
     * Initialize the redis connection.
     * @returns {Promise<void>}
     * @override
     */
    initialize(): Promise<void>;
  }

  /**
   * RestifyAdapter
   * @class
   * @extends ListenableAdapter<T>
   */
  export class RestifyAdapter<T> extends ListenableAdapter<restify.Server, RestifyAdapterOptions> {
    /**
     * Initialize the restify server.
     * @override
     * @returns {Promise<void>}
     */
    initialize(): Promise<void>;
    /**
     * Listen the restify server.
     * @override
     * @returns {Promise<void>}
     */
    listen(): Promise<void>;
  }

  export class SocketIOAdapter extends ListenableAdapter<SocketIO.Server, SocketIOAdapterOptions> {
    /**
     * @returns {Promise<void>}
     * @override
     */
    initialize(): Promise<void>;
    /**
     * @override
     * @returns {Promise<void>}
     */
    listen(): Promise<void>;
  }

  /**
   * Create a new Vertex.
   * @abstract
   * @class
   */
  export class Vertex {
    private static vertex: Vertex;

    /**
     * Register the vertex which is the suite of micro-service
     * @param {Microservice} service
     * @static
     */
    static registerVertex(vertex: Vertex): void;

    /**
     * Retrieves a registered micro-service.
     * @returns {Microservice}
     * @static
     */
    static getVertex(): Vertex;
    static getVertex<T>(): T;

    /**
     * Instantiate and run a microservice.
     * @param {Microservice} Class
     * @static
     */
    static run(Class: typeof Vertex): Promise<any[]>;

    /** @type {Object.<string, IAbstractAdapter>} [adapters={}] */
    private adapters;

    /**
     * Register the adapter.
     * @param {string} name
     * @param {IAbstractAdapter} adapter
     */
    registerAdapter(name: string, adapter: IAbstractAdapter): void;

    /**
     * @param {string} name
     * @returns {typeof Adapter}
     */
    getAdaptee<T>(name: string): T;
    getAdaptee(name: string): any;

    /**
     * @abstract
     * @param {ServiceOptions} options
     */
    main(options: ServiceOptions): void;

    /**
     * @returns {Promise<void>}
     */
    initialize(): Promise<any[]>;

    /**
     * @returns {Promise<void>}
     */
    start(): Promise<any[]>;
  }

  /**
   * AbstractController<T>
   * @abstract
   * @class
   */
  export class AbstractController<T> {
    private _server;

    /**
     * Connect your own controller here.
     * @constructs
     * @param {T} server
     */
    constructor(server: T);
    /**
     * @returns {T}
     */
    protected server: T;
    /**
     * @abstract
     */
    protected initialize(): void;
  }

  /**
   * ModelFactory
   * @class
   */
  export class ModelFactory {
    private static models;

    /**
     * Retrieves the model of given type.
     * @param {any} Class
     * @returns {any}
     */
    static get<T>(Class: any): T;
    static get(Class: any): any;
  }
}
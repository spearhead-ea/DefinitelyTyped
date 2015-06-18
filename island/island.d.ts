// Type definitions for island 0.0.9
// Project: https://github.com/wokim/island
// Definitions by: Wonshik Kim <https://github.com/wokim/>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

/// <reference path="../../typings/tsd.d.ts" />
/* 로컬에서 이 파일을 참조하다보니 아래 path resolve 문제가 생겨서 일반적인 reference path를 사용할 수 없다
/// <reference path="../bluebird/bluebird.d.ts" />
/// <reference path="../mongoose/mongoose.d.ts" />
/// <reference path="../redis/redis.d.ts" />
/// <reference path="../restify/restify.d.ts" />
/// <reference path="../amqplib/amqplib.d.ts" />
/// <reference path="../socket.io/socket.io.d.ts" />
/// <reference path="../commander/commander.d.ts" />
/// <reference path="../debug/debug.d.ts" />
*/

declare module "island" {
  import Promise = require('bluebird');
  import _mongoose = require('mongoose');
  import redis = require('redis');
  import restify = require('restify');
  import amqp = require('amqplib/callback_api');
  import io = require('socket.io');
  import debug = require('debug');
  import bl = require('bl');
  
  export var mongoose: typeof _mongoose;

  export function debug(namespace: string): debug.Debugger;
  export function error(namespace: string): debug.Debugger;

  interface RabbitMqAdapterOptions {
    url: string;
    serviceName?: string;
    socketOptions?: amqp.SocketOptions;
  }

  export interface MongooseAdapterOptions {
    uri: string;
    connectionOption?: _mongoose.ConnectionOption;
  }

  export interface RedisAdapterOptions {
    port: number;
    host: string;
    clientOpts?: redis.ClientOpts;
  }

  export interface RestifyAdapterOptions {
    serverOptions?: restify.ServerOptions;
    middlewares?: restify.RequestHandler[];
    store: ISessionStore;
    port: number;
    secret: string;
  }

  export interface ISessionStore {
    getSession(sid: string): Promise<any>;
    setSession(sid: string, session: any): Promise<any>;
    deleteSession(sid: string): Promise<void>;
  }

  export interface IToken {
    sid: string;
    aid?: string;
    aname?: string;
  }
  
  export interface ISession {
    sid: string;
    aid: string;
    aname: string;
    current?: {
      pid: string;
    };
  }
  
  export interface ISessionStore {
    getSession(sid: string): Promise<ISession>;
    setSession(sid: string, session: ISession): Promise<ISession>;
    deleteSession(sid: string): Promise<void>;
  }

  export interface SocketIOAdapterOptions {
    port: number;
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
    registerController(Class: typeof AbstractController): void;
    /**
     * @returns {Promise<void>}
     * @final
     */
    postInitialize(): Promise<void>;
    /**
     * @abstract
     * @returns {Promise<void>}
     */
    listen(): Promise<void>;
  }

  export class RabbitMqAdapter<T> extends ListenableAdapter<T, RabbitMqAdapterOptions> {
    protected connection: amqp.Connection;
    /**
     * @returns {Promise<void>}
     * @override
     */
    initialize(): Promise<void>;
    listen(): Promise<void>;
  }
  
  export class MessageBrokerAdapter extends RabbitMqAdapter<MessageBrokerService> {
    /**
     * @returns {Promise<void>}
     * @override
     */
    initialize(): Promise<void>;
  }

  /**
   * MongooseAdapter
   * @class
   * @extends AbstractAdapter<T>
   */
  export class MongooseAdapter extends AbstractAdapter<_mongoose.Connection, MongooseAdapterOptions> {
    /**
     * Initialize the mongoose connection.
     * @returns {Promise<void>}
     * @override
     */
    initialize(): Promise<void>;
  }

  /**
   * PushAdapter
   * @class
   * @extends AbstractAdapter<T>
   */
  export class PushAdapter extends AbstractAdapter<PushService, RabbitMqAdapterOptions> {
    /**
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
  
  export interface Request extends restify.Request {
    token?: IToken;
    session?: ISession;
  }
  
  export interface Response extends restify.Response {
  }
  
  export interface Next extends restify.Next {
  }

  /**
   * RestifyAdapter
   * @class
   * @extends ListenableAdapter
   */
  export class RestifyAdapter extends ListenableAdapter<restify.Server, RestifyAdapterOptions> {
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

  export class RPCAdapter extends ListenableAdapter<RPCService, RabbitMqAdapterOptions> {
    /**
     * @returns {Promise<void>}
     * @override
     */
    initialize(): Promise<void>;
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
   * Create a new Islet.
   * @abstract
   * @class
   */
  export class Islet {
    private static islet;
    /**
     * Register the islet which is the suite of micro-service
     * @param {Islet} islet
     * @static
     */
    private static registerIslet(islet);
    /**
     * Retrieves a registered micro-service.
     * @returns {Microservice}
     * @static
     */
    static getIslet(): Islet;
    static getIslet<T>(): T;
    /**
     * Instantiate and run a microservice.
     * @param {Microservice} Class
     * @static
     */
    static run(Class: typeof Islet): Promise<any[]>;
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
     */
    main(): void;
    /**
     * @returns {Promise<void>}
     */
    initialize(): Promise<any[]>;
    /**
     * @returns {Promise<void>}
     */
    start(): Promise<void[]>;
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
     * @returns {Promise<void>}
     */
    initialize(): Promise<void>;
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
  
  export interface IConsumerInfo {
    channel: amqp.Channel;
    tag: string;
  }
  export class AbstractBrokerService {
      protected connection: amqp.Connection;
      protected msgpack: MessagePack;
      protected initialized: boolean;
      constructor(connection: amqp.Connection);
      initialize(): Promise<any>;
      private getChannel();
      private call(handler, ignoreClosingChannel?);
      protected declareExchange(name: string, type: string, options: amqp.ExchangeOptions): Promise<any>;
      protected deleteExchage(name: string, options?: amqp.DeleteOptions): Promise<any>;
      protected declareQueue(name: string, options: amqp.AssertOptions): Promise<any>;
      protected deleteQueue(name: string, options?: amqp.AssertOptions): Promise<any>;
      protected bindQueue(queue: string, source: string, pattern?: string, args?: any): Promise<any>;
      protected unbindQueue(queue: string, source: string, pattern?: string, args?: any): Promise<any>;
      protected sendToQueue(queue: string, content: any, options?: any): Promise<any>;
      protected ack(message: any, allUpTo?: any): Promise<any>;
      protected _consume(key: string, handler: (msg) => void, options?: any): Promise<IConsumerInfo>;
      protected _cancel(consumerInfo: IConsumerInfo): Promise<any>;
      protected _publish(exchange: any, routingKey: any, content: any, options?: any): Promise<any>;
  }
  
  export class MessageBrokerService extends AbstractBrokerService {
    private static EXCHANGE_NAME;
    private serviceName;
    private consumerInfo;
    private handlers;
    constructor(connection: amqp.Connection, serviceName: string);
    initialize(): Promise<void>;
    purge(): Promise<any>;
    private onMessage(msg, routingKey);
    private matcher(pattern);
    subscribe(pattern: string, handler?: (msg: any) => void): Promise<any>;
    unsubscribe(pattern: string): Promise<any>;
    publish(key: string, msg: any): Promise<any>;
    private consume(handler, options?);
    private cancel(consumer);
  }

  /**
   * PushService
   * @class
   */
  export class PushService extends AbstractBrokerService {
    private static TOPIC_EXCHANGE_NAME;
    private static FANOUT_EXCHANGE_NAME;
    initialize(): Promise<void>;
    purge(): Promise<void>;
    auth(sid: string, aid: string): Promise<any>;
    unauth(sid: string, aid: string): Promise<any>;
    login(sid: string, pid: string): Promise<any>;
    logout(sid: string, pid: string): Promise<any>;
    subscribe(sid: string, pattern: string): Promise<any>;
    unsubscribe(sid: string, pattern: string): Promise<any>;
    publish(key: number, msg: any): any;
    publish(key: string, msg: any): any;
    broadcast(msg: any): Promise<any>;
    consume(key: string, handler: (msg: any, routingKey: string) => void, options?: any): Promise<IConsumerInfo>;
    cancel(consumer: IConsumerInfo): Promise<any>;
  }

  /**
   * RPCService
   * @class
   */
  export class RPCService extends AbstractBrokerService {
    private consumerInfosMap;
    initialize(): Promise<void>;
    purge(): Promise<void>;
    register(name: string, handler: (msg: any) => Promise<any>): Promise<IConsumerInfo>;
    unregister(name: string): Promise<any>;
    invoke<T, U>(name: string, msg: T): Promise<U>;
    invoke(name: string, msg: any): any;
  }

  export class MessagePack {
    private static instance;
    private packer;
    constructor();
    static getInst(): MessagePack;
    encode(obj: any): bl;
    decode<T>(buf: Buffer): T;
    decode<T>(buf: bl): T;
  }
}

// Type definitions for amqplib v0.3.0
// Project: https://github.com/squaremo/amqp.node
// Definitions by: Wonshik KIM <https://github.com/wokim>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

/// <reference path="../when/when.d.ts" /> 
/// <reference path="../node/node.d.ts" /> 

declare module "amqplib" {
  import events = require('events');
  import when = require('when');

  export interface SocketOptions {
    noDelay?: boolean;
    heartbeat?: number;
  }

  export interface AssertQueueOptions {
    exclusive?: boolean;
    durable?: boolean;
    autoDelete?: boolean;
  }

  export interface DeleteQueueOptions {
    ifUnused?: boolean;
    ifEmpty?: boolean;
  }

  export class Channel extends events.EventEmitter {
    constructor(connection: Connection);
    assertQueue(queue: string, options?: AssertQueueOptions): when.Promise<void>;
    checkQueue(queue: string): when.Promise<void>;
    deleteQueue(queue: string, options?: DeleteQueueOptions): when.Promise<void>;
    purgeQueue(queue: string): when.Promise<void>;
    bindQueue(queue: string, source: any, pattern: any, args?: any): when.Promise<void>;
    unbindQueue(queue: string, source: any, pattern: any, args?: any): when.Promise<void>;
    close(): when.Promise<void>;
  }

  export class Connection extends events.EventEmitter {
    createChannel(): when.Promise<Channel>;
    createConfirmChannel(): when.Promise<Channel>;
    close(): when.Promise<void>;
  }

  export function connect(url: string, socketOptions?: SocketOptions): when.Promise<Connection>;
}

declare module "amqplib/callback_api" {
  import events = require('events');

  export interface SocketOptions {
    noDelay?: boolean;
    heartbeat?: number;
  }

  export interface AssertOptions {
    exclusive?: boolean;
    durable?: boolean;
    autoDelete?: boolean;
  }

  export interface DeleteOptions {
    ifUnused?: boolean;
    ifEmpty?: boolean;
  }

  export interface ExchangeOptions {
    durable?: boolean;
    internal?: boolean;
    autoDelete?: boolean;
    arguments?: any;
  }

  export class Channel extends events.EventEmitter {
    constructor(connection: Connection);
    assertQueue(queue: string, options?: AssertOptions, callback?: (err: any, ok: any) => void): void;
    checkQueue(queue: string, callback?: (err: any, ok: any) => void): void;
    deleteQueue(queue: string, options?: AssertOptions, callback?: (err: any, ok: any) => void): void;
    purgeQueue(queue: string, callback?: (err: any, ok: any) => void): void;
    bindQueue(queue: string, source: any, pattern: any, args?: any, callback?: (err: any, ok: any) => void): void;
    unbindQueue(queue: string, source: any, pattern: any, args?: any, callback?: (err: any, ok: any) => void): void;
    assertExchange(exchange: any, type: any, options?: ExchangeOptions, callback?: (err: any, ok: any) => void): void;
    checkExchange(exchange: any, callback?: (err: any, ok: any) => void): void;
    deleteExchange(name: any, options?: DeleteOptions, callback?: (err: any, ok: any) => void): void;
    bindExchange(destination, source, pattern, args, callback?: (err: any, ok: any) => void): void;
    unbindExchange(destination, source, pattern, args, callback?: (err: any, ok: any) => void): void;
    publish(exchange, routingKey, content, options?);
    sendToQueue(queue: string, content: any, options?);
    consume(queue: string, handler: (msg: any) => void, options?, callback?: (err: any, ok: any) => void): void;
    cancel(consumerTag, callback?: (err: any, ok: any) => void): void;
    get(queue: string, options?: any, callback?: (err: any, msgOrFalse: any) => void): void;
    ack(message, allUpTo?: any);
    ackAll();
    nack(message, allUpTo?: any, requeue?: any);
    nackAll(requeue?: any);
    reject(message: any, requeue?: any);
    prefetch(count: number, global?: any);
    recover(callback?: (err: any, ok: any) => void): void;
    close(callback?: (err?: any) => void): void;
  }

  export class Connection extends events.EventEmitter {
    createChannel(callback?: (err: any, channel: Channel) => void): void;
    createConfirmChannel(callback?: (err: any, channel: Channel) => void): void;
    close(callback?: (err?: any) => void): void;
  }

  export function connect(url: string, socketOptions?: SocketOptions, callback?: (err: any, conn: Connection) => void): void;
}

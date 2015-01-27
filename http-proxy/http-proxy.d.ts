// Type definitions for http-proxy v1.8.1
// Project: https://github.com/nodejitsu/node-http-proxy
// Definitions by: Wonshik Kim <https://github.com/wokim/>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

/// <reference path="../node/node.d.ts" />

declare module "http-proxy" {
  import http = require('http');
  import https = require('https');
  import events = require('events');
  import net = require('net');

  export interface Options {
    target?: any;
    forward?: any;
    agent?: any;
    ssl?: https.ServerOptions;
    ws?: boolean;
    xfwd?: boolean;
    secure?: boolean;
    toProxy?: string;
    prependPath?: boolean;
    localAddress?: string;
    changeOrigin?: boolean;
    hostRewrite?: string;
  }

  export interface WebProxyOptions {
    target: string;
  }

  export interface WSProxyOptions {
  }

  export interface ProxyServer extends events.EventEmitter {
    web(req: http.ServerRequest, res: http.ServerResponse, options?: WebProxyOptions, callback?: (e: any) => any): void;
    ws(req: http.ServerRequest, socket: net.Socket, head: Buffer, options?: WSProxyOptions): any;
    listen(port: number): void;
    close(callback?: (e: any) => any): void;
  }

  export function createProxyServer(options: Options): ProxyServer;
}
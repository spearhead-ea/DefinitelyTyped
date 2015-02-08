// Type definitions for island-config 0.0.1
// Project: https://github.com/wokim/island-config
// Definitions by: Wonshik Kim <https://github.com/wokim/>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

/// <reference path="../bluebird/bluebird.d.ts" />

declare module "island-config" {
  import Promise = require('bluebird');
  export class IslandConfig {
    private etcd;
    constructor(host: string, port?: number);
    private parseNode(obj, node);
    getKey(url: string, options?: any): Promise<any>;
    getKeys(urls: string[], options?: any): Promise<any[]>;
  }
}

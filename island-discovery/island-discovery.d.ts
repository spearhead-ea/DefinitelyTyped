// Type definitions for island-discovery 0.0.1
// Project: https://github.com/wokim/island-discovery
// Definitions by: Wonshik Kim <https://github.com/wokim/>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

/// <reference path="../bluebird/bluebird.d.ts" />

declare module "island-discovery" {
  import Promise = require('bluebird');
  export class IslandDiscovery {
    private etcd;
    constructor(url: string);
    getKey<T>(url: string, options?: {
      wait?: boolean;
    }): Promise<T>;
    getKeys(urls: string[], options?: {
      wait?: boolean;
    }): Promise<any[]>;
  }
}
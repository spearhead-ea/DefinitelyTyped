// Type definitions for island-keeper 0.0.2
// Project: https://github.com/wokim/island-keeper
// Definitions by: Wonshik Kim <https://github.com/wokim/>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

/// <reference path="../bluebird/bluebird.d.ts" />

declare module "island-keeper" {
  import Promise = require('bluebird');
  import events = require('events');
  export class IslandKeeper {
    private static instance;
    private etcd;
    private initialized;
    private intervalIds;
    constructor();
    static getInst(): IslandKeeper;
    init(host: string, port?: number): IslandKeeper;
    private parseNode(obj, node);
    getKey(key: string, options?: any): Promise<any>;
    getKeys(keys: string[], options?: any): Promise<any[]>;
    setKey(key: string, value: any, options?: any): Promise<void>;
    setKeys(keys: string[], values: any[], options?: any): Promise<any[]>;
    getWatcher(key: any, options?: any): events.EventEmitter;
    getIslandConfig(): Promise<any>;
    exploreIsland(name: string, options?: any): Promise<any>;
    exploreIslands(handler: (action: string, value: any) => void): void;
    registerIsland(name: string, value: any, options?: any): Promise<void>;
    unregisterIsland(name: string): void;
  }
}
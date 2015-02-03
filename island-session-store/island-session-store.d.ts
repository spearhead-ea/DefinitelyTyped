// Type definitions for island-session-store 0.0.2
// Project: https://github.com/wokim/island-session-store
// Definitions by: Wonshik Kim <https://github.com/wokim/>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

/// <reference path="../island/island.d.ts" />
/// <reference path="../bluebird/bluebird.d.ts" />

declare module "island-session-store" {
  import island = require('island');
  import Promise = require('bluebird');

  export class SessionStore implements island.ISessionStore {
    private static instance;
    private prefix;
    private initialized;
    private redisClient;
    private static TTL;
    constructor();
    static getInstance(): SessionStore;
    initialize(options?: island.RedisAdapterOptions): void;
    private getRedisKey(sid);
    /**
     * Gets a session.
     * @param {string} sid
     * @return {Promise<ISession>}
     */
    getSession(sid: string): Promise<any>;
    /**
     * Set given session.
     * @param {string} sid
     * @param {ISession} session
     * @return {Promise<ISession>}
     */
    setSession(sid: string, session: any): Promise<any>;
    /**
     * Delete a session.
     * @param {string} sid
     * @return {Promise<void>}
     */
    deleteSession(sid: string): Promise<void>;
  }
}

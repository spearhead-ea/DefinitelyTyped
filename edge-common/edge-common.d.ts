/// <reference path="../restify/restify.d.ts" />
/// <reference path="../vertex/vertex.d.ts" />

declare module "edge-common" {
  import restify = require('restify');
  import vertex = require('vertex');

  export interface Request extends restify.Request {
    token?: IToken;
    session?: ISession;
  }

  export interface IToken extends vertex.IToken {
    aid: string;
    aname: string;
  }

  export interface ISession {
    sid: string;
    aid: string;
    aname: string;
    current?: {
      rid: string;
    };
  }
}
/// <reference path="../restify/restify.d.ts" />
/// <reference path="../island/island.d.ts" />

declare module "edge-common" {
  import restify = require('restify');
  import island = require('island');

  export interface Request extends restify.Request {
    token?: IToken;
    session?: ISession;
  }

  export interface IToken extends island.IToken {
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

  // NOTE: done is better than perfect.
  // 서브모듈을 용도에 맞게 잘 나눠보자.
  export module Core {
    interface IRacer {
      rid: string;
      name: string;
      level: number;
      carid: number;
    }

    interface IVehicle {
      rid: string;
      vid: number;
      grade: number;
      exp: number;
    }
  }

  export module Match {
    export enum GameState {
      WAIT,
      READY,
      RACE
    }

    interface IGame {
      id: number;
      state: GameState;
      entries: IEntry[];
      createAt: number;
    }

    interface IEntry {
      racer: Core.IRacer;
      ready: boolean;
    }
  }
}

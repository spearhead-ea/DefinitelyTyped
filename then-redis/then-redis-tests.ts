/// <reference path="then-redis.d.ts" />

import redis = require('then-redis');

//var value:any;
//var valueArr:any[];
var num:number;
var str:string;
var bool:boolean;
//var err:Error;
//var args:any[];
var options:redis.ClientOpts;
var client:redis.RedisClient;
//var info:redis.ServerInfo;

// ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----

client = redis.createClient(num, str, options);

redis.debug_mode = true;

bool = redis.debug_mode;

client.ping();

client.get('abc').then(() => {
});

client.quit();

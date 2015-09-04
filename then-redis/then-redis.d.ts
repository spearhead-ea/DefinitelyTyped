// Type definitions for then-redis
// Project: https://github.com/mjackson/then-redis
// Definitions by: DongYoon Lee <https://github.com/nainu>
// Definitions: https://github.com/nainu/DefinitelyTyped

// Imported from:

/// <reference path="../bluebird/bluebird.d.ts" />
/// <reference path="../node/node.d.ts" />

declare module "then-redis" {
  import Promise = require("bluebird");

	export function createClient(port_arg: number, host_arg?: string, options?: ClientOpts): RedisClient;
	export function createClient(unix_socket: string, options?: ClientOpts): RedisClient;
	export function createClient(options?: ClientOpts): RedisClient;
	export function print(err: Error, reply: any): void;
	export var debug_mode: boolean;

	interface MessageHandler {
		(channel: string, message: any): void;
	}

//	interface CommandT<R> { //This is a placeholder to be used eventually, to not have to define each command twice, or four times if all caps versions are to be implemented.
//		(args: any[]): Promise<any>;
//		(...args: any[]): void;
//	}

	//  interface ResCallbackT<R> {
	//    (err: Error, res: R): void;
	//  }

	interface ServerInfo {
		redis_version: string;
		versions: number[];
	}

	interface ClientOpts {
		parser?: string;
		return_buffers?: boolean;
		detect_buffers?: boolean;
		socket_nodelay?: boolean;
		no_ready_check?: boolean;
		enable_offline_queue?: boolean;
		retry_max_delay?: number;
		connect_timeout?: number;
		max_attempts?: number;
		auth_pass?: string;
	}

	interface RedisClient extends NodeJS.EventEmitter {
		// event: connect
		// event: error
		// event: message
		// event: pmessage
		// event: subscribe
		// event: psubscribe
		// event: unsubscribe
		// event: punsubscribe

		connected: boolean;
		retry_delay: number;
		retry_backoff: number;
		command_queue: any[];
		offline_queue: any[];
		server_info: ServerInfo;

		end(): void;

		// Connection (http://redis.io/commands#connection)
		auth(password: string): Promise<any>;
		ping(): Promise<any>;

		// Strings (http://redis.io/commands#strings)
		append(key: string, value: string): Promise<any>;
		bitcount(key: string): Promise<any>;
		bitcount(key: string, start: number, end: number): Promise<any>;
		set(key: string, value: string): Promise<any>;
		get(key: string): Promise<any>;
		exists(key: string, value: string): Promise<any>;

		publish(channel: string, value: any): void;
		subscribe(channel: string): void;

		/*
		   commands = set_union([
		   "get", "set", "setnx", "setex", "append", "strlen", "del", "exists", "setbit", "getbit", "setrange", "getrange", "substr",
		   "incr", "decr", "mget", "rpush", "lpush", "rpushx", "lpushx", "linsert", "rpop", "lpop", "brpop", "brpoplpush", "blpop", "llen", "lindex",
		   "lset", "lrange", "ltrim", "lrem", "rpoplpush", "sadd", "srem", "smove", "sismember", "scard", "spop", "srandmember", "sinter", "sinterstore",
		   "sunion", "sunionstore", "sdiff", "sdiffstore", "smembers", "zadd", "zincrby", "zrem", "zremrangebyscore", "zremrangebyrank", "zunionstore",
		   "zinterstore", "zrange", "zrangebyscore", "zrevrangebyscore", "zcount", "zrevrange", "zcard", "zscore", "zrank", "zrevrank", "hset", "hsetnx",
		   "hget", "hmset", "hmget", "hincrby", "hdel", "hlen", "hkeys", "hvals", "hgetall", "hexists", "incrby", "decrby", "getset", "mset", "msetnx",
		   "randomkey", "select", "move", "rename", "renamenx", "expire", "expireat", "keys", "dbsize", "auth", "ping", "echo", "save", "bgsave",
		   "bgrewriteaof", "shutdown", "lastsave", "type", "multi", "exec", "discard", "sync", "flushdb", "flushall", "sort", "info", "monitor", "ttl",
		   "persist", "slaveof", "debug", "config", "subscribe", "unsubscribe", "psubscribe", "punsubscribe", "publish", "watch", "unwatch", "cluster",
		   "restore", "migrate", "dump", "object", "client", "eval", "evalsha"], require("./lib/commands"));
		 */

		get(args: any[]): Promise<any>;
		get(...args: any[]): Promise<any>;
		set(args: any[]): Promise<any>;
		set(...args: any[]): Promise<any>;
		setnx(args: any[]): Promise<any>;
		setnx(...args: any[]): Promise<any>;
		setex(args: any[]): Promise<any>;
		setex(...args: any[]): Promise<any>;
		append(args: any[]): Promise<any>;
		append(...args: any[]): Promise<any>;
		strlen(args: any[]): Promise<any>;
		strlen(...args: any[]): Promise<any>;
		del(args: any[]): Promise<any>;
		del(...args: any[]): Promise<any>;
		exists(args: any[]): Promise<any>;
		exists(...args: any[]): Promise<any>;
		setbit(args: any[]): Promise<any>;
		setbit(...args: any[]): Promise<any>;
		getbit(args: any[]): Promise<any>;
		getbit(...args: any[]): Promise<any>;
		setrange(args: any[]): Promise<any>;
		setrange(...args: any[]): Promise<any>;
		getrange(args: any[]): Promise<any>;
		getrange(...args: any[]): Promise<any>;
		substr(args: any[]): Promise<any>;
		substr(...args: any[]): Promise<any>;
		incr(args: any[]): Promise<any>;
		incr(...args: any[]): Promise<any>;
		decr(args: any[]): Promise<any>;
		decr(...args: any[]): Promise<any>;
		mget(args: any[]): Promise<any>;
		mget(...args: any[]): Promise<any>;
		rpush(...args: any[]): Promise<any>;
		lpush(args: any[]): Promise<any>;
		lpush(...args: any[]): Promise<any>;
		rpushx(args: any[]): Promise<any>;
		rpushx(...args: any[]): Promise<any>;
		lpushx(args: any[]): Promise<any>;
		lpushx(...args: any[]): Promise<any>;
		linsert(args: any[]): Promise<any>;
		linsert(...args: any[]): Promise<any>;
		rpop(args: any[]): Promise<any>;
		rpop(...args: any[]): Promise<any>;
		lpop(args: any[]): Promise<any>;
		lpop(...args: any[]): Promise<any>;
		brpop(args: any[]): Promise<any>;
		brpop(...args: any[]): Promise<any>;
		brpoplpush(args: any[]): Promise<any>;
		brpoplpush(...args: any[]): Promise<any>;
		blpop(args: any[]): Promise<any>;
		blpop(...args: any[]): Promise<any>;
		llen(args: any[]): Promise<any>;
		llen(...args: any[]): Promise<any>;
		lindex(args: any[]): Promise<any>;
		lindex(...args: any[]): Promise<any>;
		lset(args: any[]): Promise<any>;
		lset(...args: any[]): Promise<any>;
		lrange(args: any[]): Promise<any>;
		lrange(...args: any[]): Promise<any>;
		ltrim(args: any[]): Promise<any>;
		ltrim(...args: any[]): Promise<any>;
		lrem(args: any[]): Promise<any>;
		lrem(...args: any[]): Promise<any>;
		rpoplpush(args: any[]): Promise<any>;
		rpoplpush(...args: any[]): Promise<any>;
		sadd(args: any[]): Promise<any>;
		sadd(...args: any[]): Promise<any>;
		srem(args: any[]): Promise<any>;
		srem(...args: any[]): Promise<any>;
		smove(args: any[]): Promise<any>;
		smove(...args: any[]): Promise<any>;
		sismember(args: any[]): Promise<any>;
		sismember(...args: any[]): Promise<any>;
		scard(args: any[]): Promise<any>;
		scard(...args: any[]): Promise<any>;
		spop(args: any[]): Promise<any>;
		spop(...args: any[]): Promise<any>;
		srandmember(args: any[]): Promise<any>;
		srandmember(...args: any[]): Promise<any>;
		sinter(args: any[]): Promise<any>;
		sinter(...args: any[]): Promise<any>;
		sinterstore(args: any[]): Promise<any>;
		sinterstore(...args: any[]): Promise<any>;
		sunion(args: any[]): Promise<any>;
		sunion(...args: any[]): Promise<any>;
		sunionstore(args: any[]): Promise<any>;
		sunionstore(...args: any[]): Promise<any>;
		sdiff(args: any[]): Promise<any>;
		sdiff(...args: any[]): Promise<any>;
		sdiffstore(args: any[]): Promise<any>;
		sdiffstore(...args: any[]): Promise<any>;
		smembers(args: any[]): Promise<any>;
		smembers(...args: any[]): Promise<any>;
		zadd(args: any[]): Promise<any>;
		zadd(...args: any[]): Promise<any>;
		zincrby(args: any[]): Promise<any>;
		zincrby(...args: any[]): Promise<any>;
		zrem(args: any[]): Promise<any>;
		zrem(...args: any[]): Promise<any>;
		zremrangebyscore(args: any[]): Promise<any>;
		zremrangebyscore(...args: any[]): Promise<any>;
		zremrangebyrank(args: any[]): Promise<any>;
		zremrangebyrank(...args: any[]): Promise<any>;
		zunionstore(args: any[]): Promise<any>;
		zunionstore(...args: any[]): Promise<any>;
		zinterstore(args: any[]): Promise<any>;
		zinterstore(...args: any[]): Promise<any>;
		zrange(args: any[]): Promise<any>;
		zrange(...args: any[]): Promise<any>;
		zrangebyscore(args: any[]): Promise<any>;
		zrangebyscore(...args: any[]): Promise<any>;
		zrevrangebyscore(args: any[]): Promise<any>;
		zrevrangebyscore(...args: any[]): Promise<any>;
		zcount(args: any[]): Promise<any>;
		zcount(...args: any[]): Promise<any>;
		zrevrange(args: any[]): Promise<any>;
		zrevrange(...args: any[]): Promise<any>;
		zcard(args: any[]): Promise<any>;
		zcard(...args: any[]): Promise<any>;
		zscore(args: any[]): Promise<any>;
		zscore(...args: any[]): Promise<any>;
		zrank(args: any[]): Promise<any>;
		zrank(...args: any[]): Promise<any>;
		zrevrank(args: any[]): Promise<any>;
		zrevrank(...args: any[]): Promise<any>;
		hset(args: any[]): Promise<any>;
		hset(...args: any[]): Promise<any>;
		hsetnx(args: any[]): Promise<any>;
		hsetnx(...args: any[]): Promise<any>;
		hget(args: any[]): Promise<any>;
		hget(...args: any[]): Promise<any>;
		hmset(args: any[]): Promise<any>;
		hmset(key: string, hash: any): Promise<any>;
		hmset(...args: any[]): Promise<any>;
		hmget(args: any[]): Promise<any>;
		hmget(...args: any[]): Promise<any>;
		hincrby(args: any[]): Promise<any>;
		hincrby(...args: any[]): Promise<any>;
		hdel(args: any[]): Promise<any>;
		hdel(...args: any[]): Promise<any>;
		hlen(args: any[]): Promise<any>;
		hlen(...args: any[]): Promise<any>;
		hkeys(args: any[]): Promise<any>;
		hkeys(...args: any[]): Promise<any>;
		hvals(args: any[]): Promise<any>;
		hvals(...args: any[]): Promise<any>;
		hgetall(args: any[]): Promise<any>;
		hgetall(...args: any[]): Promise<any>;
		hgetall(key: string): Promise<any>;
		hexists(args: any[]): Promise<any>;
		hexists(...args: any[]): Promise<any>;
		incrby(args: any[]): Promise<any>;
		incrby(...args: any[]): Promise<any>;
		decrby(args: any[]): Promise<any>;
		decrby(...args: any[]): Promise<any>;
		getset(args: any[]): Promise<any>;
		getset(...args: any[]): Promise<any>;
		mset(args: any[]): Promise<any>;
		mset(...args: any[]): Promise<any>;
		msetnx(args: any[]): Promise<any>;
		msetnx(...args: any[]): Promise<any>;
		randomkey(args: any[]): Promise<any>;
		randomkey(...args: any[]): Promise<any>;
		select(args: any[]): Promise<any>;
		select(...args: any[]): Promise<any>;
		move(args: any[]): Promise<any>;
		move(...args: any[]): Promise<any>;
		rename(args: any[]): Promise<any>;
		rename(...args: any[]): Promise<any>;
		renamenx(args: any[]): Promise<any>;
		renamenx(...args: any[]): Promise<any>;
		expire(args: any[]): Promise<any>;
		expire(...args: any[]): Promise<any>;
		expireat(args: any[]): Promise<any>;
		expireat(...args: any[]): Promise<any>;
		keys(args: any[]): Promise<any>;
		keys(...args: any[]): Promise<any>;
		dbsize(args: any[]): Promise<any>;
		dbsize(...args: any[]): Promise<any>;
		auth(args: any[]): Promise<any>;
		auth(...args: any[]): Promise<any>;
		ping(args: any[]): Promise<any>;
		ping(...args: any[]): Promise<any>;
		echo(args: any[]): Promise<any>;
		echo(...args: any[]): Promise<any>;
		save(args: any[]): Promise<any>;
		save(...args: any[]): Promise<any>;
		bgsave(args: any[]): Promise<any>;
		bgsave(...args: any[]): Promise<any>;
		bgrewriteaof(args: any[]): Promise<any>;
		bgrewriteaof(...args: any[]): Promise<any>;
		shutdown(args: any[]): Promise<any>;
		shutdown(...args: any[]): Promise<any>;
		lastsave(args: any[]): Promise<any>;
		lastsave(...args: any[]): Promise<any>;
		type(args: any[]): Promise<any>;
		type(...args: any[]): Promise<any>;
		multi(args: any[]): Promise<any>;
		multi(...args: any[]): Promise<any>;
		exec(args: any[]): Promise<any>;
		exec(...args: any[]): Promise<any>;
		discard(args: any[]): Promise<any>;
		discard(...args: any[]): Promise<any>;
		sync(args: any[]): Promise<any>;
		sync(...args: any[]): Promise<any>;
		flushdb(args: any[]): Promise<any>;
		flushdb(...args: any[]): Promise<any>;
		flushall(args: any[]): Promise<any>;
		flushall(...args: any[]): Promise<any>;
		sort(args: any[]): Promise<any>;
		sort(...args: any[]): Promise<any>;
		info(args: any[]): Promise<any>;
		info(...args: any[]): Promise<any>;
		monitor(args: any[]): Promise<any>;
		monitor(...args: any[]): Promise<any>;
		ttl(args: any[]): Promise<any>;
		ttl(...args: any[]): Promise<any>;
		persist(args: any[]): Promise<any>;
		persist(...args: any[]): Promise<any>;
		slaveof(args: any[]): Promise<any>;
		slaveof(...args: any[]): Promise<any>;
		debug(args: any[]): Promise<any>;
		debug(...args: any[]): Promise<any>;
		config(args: any[]): Promise<any>;
		config(...args: any[]): Promise<any>;
		subscribe(args: any[]): Promise<any>;
		subscribe(...args: any[]): Promise<any>;
		unsubscribe(args: any[]): Promise<any>;
		unsubscribe(...args: any[]): Promise<any>;
		psubscribe(args: any[]): Promise<any>;
		psubscribe(...args: any[]): Promise<any>;
		punsubscribe(args: any[]): Promise<any>;
		punsubscribe(...args: any[]): Promise<any>;
		publish(args: any[]): Promise<any>;
		publish(...args: any[]): Promise<any>;
		watch(args: any[]): Promise<any>;
		watch(...args: any[]): Promise<any>;
		unwatch(args: any[]): Promise<any>;
		unwatch(...args: any[]): Promise<any>;
		cluster(args: any[]): Promise<any>;
		cluster(...args: any[]): Promise<any>;
		restore(args: any[]): Promise<any>;
		restore(...args: any[]): Promise<any>;
		migrate(args: any[]): Promise<any>;
		migrate(...args: any[]): Promise<any>;
		dump(args: any[]): Promise<any>;
		dump(...args: any[]): Promise<any>;
		object(args: any[]): Promise<any>;
		object(...args: any[]): Promise<any>;
		client(args: any[]): Promise<any>;
		client(...args: any[]): Promise<any>;
		eval(args: any[]): Promise<any>;
		eval(...args: any[]): Promise<any>;
		evalsha(args: any[]): Promise<any>;
		evalsha(...args: any[]): Promise<any>;
		quit(args: any[]): Promise<any>;
		quit(...args: any[]): Promise<any>;
	}
}

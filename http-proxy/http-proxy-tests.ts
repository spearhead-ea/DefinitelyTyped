/// <reference path="http-proxy.d.ts" />
import httpProxy = require('http-proxy');
import http = require('http');

var options: httpProxy.Options = { target: 'http://localhost:9005' };
var proxy = httpProxy.createProxyServer(options);
proxy.listen(8085);

var server = http.createServer(function (req, res) {
  proxy.web(req, res, { target: 'http://mytarget.com:8080' }, function (e) { });
});

proxy.on('error', function (e) { });
proxy.on('proxyReq', function (proxyReq, req, res, options) {
  proxyReq.setHeader('X-Special-Proxy-Header', 'foobar');
});
server.listen(5050);
server.close();

proxy.close();
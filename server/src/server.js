// This RPC server will announce itself as `rpc_test`
// in our Grape Bittorrent network
// When it receives requests, it will answer with 'world'

'use strict'

const { PeerRPCServer }  = require('grenache-nodejs-http')
const Link = require('grenache-nodejs-link')
const OrderService = require('./modules/orders/order.service.js')();
const requestProxy = require('./utils/request-proxy.util');
const { REQUESTS } = require('../../commons/proto/services');
const { logger } = require('./../../commons/utils/logger');

const link = new Link({
  grape: 'http://127.0.0.1:30001'
})
link.start()

const peer = new PeerRPCServer(link, {
  timeout: 300000
})
peer.init()

const port = 1024 + Math.floor(Math.random() * 1000)
const service = peer.transport('server')
service.listen(port)

setInterval(function () {
  Object.keys(REQUESTS).forEach(key => {
    link.announce(REQUESTS[key], service.port, {})
  })
}, 1000)

service.on('request', (rid, key, payload, handler) => {
  console.log(rid);
  console.log(key);
  requestProxy(key, handler, OrderService, payload);
})




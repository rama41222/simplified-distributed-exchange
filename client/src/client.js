// This client will as the DHT for a service called `rpc_test`
// and then establishes a P2P connection it.
// It will then send { msg: 'hello' } to the RPC server

'use strict'

const { PeerRPCClient }  = require('grenache-nodejs-http')
const Link = require('grenache-nodejs-link')
const { REQUESTS } = require('../../proto/services');
const OrderService = require('./modules/orders/order.service')();

const link = new Link({
  grape: 'http://127.0.0.1:30001'
})
link.start()

const peer = new PeerRPCClient(link, {})
peer.init()

peer.request(REQUESTS.HANDSHAKE, { msg: 'hello handshake' }, { timeout: 10000 }, (err, data) => {
  if (err) {
    console.error(err)
    process.exit(-1)
  }
  console.log('1')
  console.log(data)
})

peer.request(REQUESTS.GET_BUY_ORDERS, { msg: 'hello server1' }, { timeout: 10000 }, (err, data) => {
  if (err) {
    console.error(err)
    process.exit(-1)
  }
  console.log('2')

  console.log(data)
})

peer.request(REQUESTS.GET_SELL_ORDERS, { msg: 'hello server2' }, { timeout: 10000 }, (err, data) => {
  if (err) {
    console.error(err)
    process.exit(-1)
  }
  console.log('3')

  console.log(data)
})



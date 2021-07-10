// This client will as the DHT for a service called `rpc_test`
// and then establishes a P2P connection it.
// It will then send { msg: 'hello' } to the RPC server

'use strict'

const { PeerRPCClient }  = require('grenache-nodejs-http')
const Link = require('grenache-nodejs-link')
const { REQUESTS } = require('../../proto/services');
const { logger } = require('../../server/src/utils/logger');
const OrderService = require('./modules/orders/order.service')();
const WalletService = require('./modules/wallet/wallet.service')();
const CurrencyType = require('./modules/wallet/currency-type.model');

/**
 * This fuction adds seed money into wallet
 * @returns {void}
 */
const seeder = () => {
  WalletService.deposit(1, 100);  
  WalletService.deposit(2, 1000);  
  logger(200, [...WalletService.getWallet().entries()]);
}

const link = new Link({
  grape: 'http://127.0.0.1:30001'
})
link.start()
const peer = new PeerRPCClient(link, {})
peer.init()
seeder();

peer.request(REQUESTS.HANDSHAKE, { msg: 'init' }, { timeout: 10000 }, (err, data) => {
  if (err) {
    logger(500, err);
    process.exit(-1)
  }
  logger(200, data);
})

peer.request(REQUESTS.GET_BUY_ORDERS, { msg: 'hello server1' }, { timeout: 10000 }, (err, data) => {
  if (err) {
    logger(500, err)
    process.exit(-1)
  }
  logger(200, data);
})

peer.request(REQUESTS.GET_SELL_ORDERS, { msg: 'hello server2' }, { timeout: 10000 }, (err, data) => {
  if (err) {
  logger(200, data);
    process.exit(-1)
  }
  logger(200, data);
})



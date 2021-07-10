// This client will as the DHT for a service called `rpc_test`
// and then establishes a P2P connection it.
// It will then send { msg: 'hello' } to the RPC server

'use strict'

const { PeerRPCClient }  = require('grenache-nodejs-http')
const Link = require('grenache-nodejs-link')
const { REQUESTS } = require('../../commons/proto/services');
const { logger } = require('../../commons/utils/logger');
const Order = require('../../server/src/modules/orders/order.model');
const OrderService = require('./modules/order-book/order-book.service')();
const WalletService = require('./modules/wallet/wallet.service')();
const CurrencyType = require('./modules/wallet/currency-type.model');
const { createBuyOrder, createSellOrder} = require('./modules/workflows');
const clientName = "1";
/**
 * This fuction adds seed money into wallet
 * @returns {void}
 */
const seeder = () => {
  WalletService.deposit(1, 100);  
  WalletService.deposit(2, 1000000);  
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

peer.request(REQUESTS.GET_ORDERS, { timeout: 10000 }, async(err, data) => {
  if (err) {
    logger(500, err)
    process.exit(-1)
  }
  logger(200, data);

  /** Sync with the own order book */
  
  OrderService.syncOrder(data);
  /** 
   * Create Buy Order 
   * currencyType, exchangeRate, amount, peer, WalletService, OrderService, id
   * */
  const result = await Promise.all[
    createBuyOrder(1, 221, 1, peer ,WalletService, OrderService, clientName),
    createBuyOrder(1, 220, 2, peer, WalletService, OrderService, clientName),
    createBuyOrder(2, 1, 120, peer, WalletService, OrderService, clientName),
    createBuyOrder(2, 1, 300, peer, WalletService, OrderService, clientName),
    createBuyOrder(2, 0.9, 223, peer, WalletService, OrderService, clientName),
    createBuyOrder(2, 1.1, 120, peer, WalletService, OrderService, clientName)]
    console.log('00000>', result)
  logger(20, [result]); 
  /** Create Sell Order */
  // createBuyOrder(peer, WalletService, OrderService, clientName);

});
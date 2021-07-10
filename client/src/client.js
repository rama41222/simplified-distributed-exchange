// This client will as the DHT for a service called `rpc_test`
// and then establishes a P2P connection it.
// It will then send { msg: 'hello' } to the RPC server

'use strict'

const { PeerRPCClient }  = require('grenache-nodejs-http')
const Link = require('grenache-nodejs-link')
const { REQUESTS } = require('../../commons/proto/services');
const { logger } = require('../../commons/utils/logger');
const Order = require('../../server/src/modules/orders/order.model');
const { CLIENT_ID } = require('../constants/constants');
const OrderService = require('./modules/order-book/order-book.service')();
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



/**
 * Create a buy order to server
 * @date 2021-07-10
 * @returns {void}
 */
const createBuyOrder = () => {

  logger(200, 'Initializing a sell Order');
  // decide order amount;
  const amount = 1;

  // get the current balance
  const currentBalance = WalletService.getBalance(1);
  logger(201, currentBalance);

  /** check if balance is greater than withdrawal amount */
  if (!(currentBalance > amount)) {
    logger(201, RESPONSE.INSUFFICIENT_BALANCE);
  }
  
  /** Withdraw */
  const newBalance = WalletService.withdraw(1, amount);
  console.log('neewe', newBalance)
  logger(200,  newBalance);

  /** 
   * Create new order
   * Assumes that 1 BTC is 220,
   * If a seller is selling for this amount, the transaction will be carried out
   * So called a limit order
   */
  const askingAmount = 220;
  const order = new Order(1, amount, askingAmount, amount * askingAmount, CLIENT_ID);

  /** Request server to create an order */
  peer.request(REQUESTS.CREATE_BUY_ORDER, order, { timeout: 10000 }, (err, {code, message, data}) => {
    if (err) {
      logger(500, err);
      process.exit(-1)
    }
    /** 
     * If the transaction went through,
     * Sync the local book,
     * Sync the wallet  with asking amount
     * */
    logger(code, message);
    OrderService.syncOrder(data);
    /** Check our orderbook if the transaction is updated */
    logger(200, OrderService.getOrders())
    logger(201, WalletService.getWallet())
    /** End of transaction */
  })
}

/**
 * Create a sell order to server
 * @date 2021-07-10
 * @returns {void}
 */
const createSellOrder = () => {

  logger(200, 'Initializing a Order');
  // decide order amount;
  const amount = 1;

  // get the current balance
  const currentBalance = WalletService.getBalance(1);
  logger(201, currentBalance);

  /** check if balance is greater than withdrawal amount */
  if (!(currentBalance > amount)) {
    logger(201, RESPONSE.INSUFFICIENT_BALANCE);
  }
  
  /** Withdraw */
  const newBalance = WalletService.withdraw(1, amount);
  console.log('neewe', newBalance)
  logger(200,  newBalance);

  /** 
   * Create new order
   * Assumes that 1 BTC is 220,
   * If a seller is selling for this amount, the transaction will be carried out
   * So called a limit order
   */
  const askingAmount = 220;
  const order = new Order(1, amount, askingAmount, amount * askingAmount, CLIENT_ID);

  /** Request server to create an order */
  peer.request(REQUESTS.CREATE_BUY_ORDER, order, { timeout: 10000 }, (err, {code, message, data}) => {
    if (err) {
      logger(500, err);
      process.exit(-1)
    }
    /** 
     * If the transaction went through,
     * Sync the local book,
     * Sync the wallet  with asking amount
     * */
    console.log('woooohooo', data)
    logger(code, message);
    console.log('woooohooo')
    OrderService.syncOrder(data);
    console.log('woooohooo')

    /** Check our orderbook if the transaction is updated */
    logger(200, OrderService.getOrders())
    logger(201, WalletService.getWallet())
    /** End of transaction */

  })

  /** Sync the order book if successfull */
}

createBuyOrder();
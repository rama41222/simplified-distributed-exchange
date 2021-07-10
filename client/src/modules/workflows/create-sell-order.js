const Order = require('../order-book/order-book.model');
const { logger } = require('../../../../commons/utils/logger');
const { MESSAGES, CLIENT_ID } = require('../../../constants/constants');
const { REQUESTS } = require('./../../../../commons/proto/services');

/**
 * Create a sell order to server
 * @date 2021-07-10
 * @returns {void}
 */
 const createSellOrder = (currencyType, exchangeRate, amount, peer, WalletService, OrderService, id) => {

    logger(200, 'Initializing a sell Order');  
  
    // get the current balance
    const currentBalance = WalletService.getBalance(currencyType);
    logger(201, currentBalance);
  
    /** check if balance is greater than withdrawal amount */
    if (!(currentBalance > amount)) {
      logger(201, MESSAGES.INSUFFICIENT_BALANCE);
    }
    
    /** Withdraw */
    const newBalance = WalletService.withdraw(currencyType, amount);
    console.log('neewe', newBalance)
    logger(200,  newBalance);
  
    /** 
     * Create new sell order
     * Assumes that 1 BTC is 220,
     * If a seller is selling for this amount, the transaction will be carried out
     * So called a limit order
     */
    const order = new Order(1, amount, exchangeRate, amount * exchangeRate, CLIENT_ID(id));
  
    /** Request server to create an order */
    peer.request(REQUESTS.CREATE_SELL_ORDER, order, { timeout: 10000 }, (err, {code, message, data}) => {
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

  module.exports = {
    createSellOrder
  }
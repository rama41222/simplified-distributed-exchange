const Order = require('../order-book/order-book.model');
const { logger } = require('../../../../commons/utils/logger');
const { MESSAGES, CLIENT_ID } = require('../../../constants/constants');
const { REQUESTS } = require('./../../../../commons/proto/services');

/**
 * Create a buy order to server
 * @date 2021-07-10
 * @returns {void}
 */
 const createBuyOrder = async (currencyType, exchangeRate, amount, peer, WalletService, OrderService, id) => {
  console.log('currencyType:', currencyType)
  /** choose opposite currency when creating a buy order */
    var oppositeType = -1 ;

    if (currencyType === 1) {
      oppositeType = 2;
    } else if (currencyType === 2) {
      oppositeType = 1
    }
    
    logger(200, `Initializing a buy Order ${oppositeType}`);
    // decide order amount;
    const valuation = amount * exchangeRate;
    // get the current balance
    const currentBalance = WalletService.getBalance(oppositeType);
    logger(201, currentBalance);
  
    /** check if balance is greater than withdrawal amount */
    if (!(currentBalance > valuation)) {
      logger(201, MESSAGES.INSUFFICIENT_BALANCE);
    }
    
    /** Withdraw from Opposite Balance */
    const newBalance = WalletService.withdraw(oppositeType, valuation);
    logger(200,  newBalance);
  
    /** 
     * Create new order
     * Assumes that 1 BTC is 220,
     * If a seller is selling for this amount, the transaction will be carried out
     * So called a limit order
     */
    const order = new Order(1, amount, exchangeRate, valuation, CLIENT_ID(id));
    logger(-1, order)

    /** Request server to create an order */
    return new Promise((resolve, reject) => {
      peer.request(REQUESTS.CREATE_BUY_ORDER, order, { timeout: 10000 }, (err, { code, message, data }) => {
        if (err) {
          logger(500, err);
          reject(-1);
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
        logger(201, [...WalletService.getWallet().entries()])
        setTimeout(function(){
          resolve(true);
        },3000)
        /** End of transaction */
      })
    }).catch(e => logger(500, e.message));
  }

  module.exports = {
    createBuyOrder
  }
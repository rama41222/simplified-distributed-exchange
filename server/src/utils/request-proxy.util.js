const { logger } = require('./logger');
const { MESSAGES } = require('../constants/constants');
const { response } = require('./response');
const { OrderType } = require('./../modules/orders/type.model');
const { REQUESTS } = require('./../../../proto/services');

const requestProxy = (type, handler, datastore) => {
    switch(type) {
     case REQUESTS.HANDSHAKE:
        handler.reply(null, { ...response(200, MESSAGES.SUCCESS), data: []});
     break;
     case REQUESTS.GET_ORDERS:
      console.log('gettig orders');
      handler.reply(null, { ...response(200, MESSAGES.SUCCESS), data: datastore.getOrders()});
     break;
     case REQUESTS.GET_BUY_ORDERS:
      console.log('gettig buying orders');
      handler.reply(null, { ...response(200, MESSAGES.SUCCESS), data: datastore.getOrdersByType(OrderType.types[1])});
     break;
     case REQUESTS.GET_SELL_ORDERS:
      console.log('gettig selling orders');
      handler.reply(null, { ...response(200, MESSAGES.SUCCESS), data: datastore.getOrdersByType(OrderType.types[2])});
     break;
     default: 
     logger(400, MESSAGES.INVALID_REQUEST);
    }
}

module.exports = requestProxy;
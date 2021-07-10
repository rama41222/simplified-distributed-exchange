const { logger } = require("../../../commons/utils/logger");
const { MESSAGES } = require("../constants/constants");
const { response } = require("./response");
const { REQUESTS } = require("../../../commons/proto/services");

const requestProxy = (type, handler, datastore, payload) => {
  console.log(datastore);
  switch (type) {
    case REQUESTS.HANDSHAKE:
      handler.reply(null, { ...response(200, MESSAGES.SUCCESS), data: [] });
      break;
    case REQUESTS.GET_ORDERS:
      console.log("gettig orders");
      handler.reply(null, {
        ...response(200, MESSAGES.SUCCESS),
        data: datastore.getOrders(),
      });
      break;
    case REQUESTS.GET_BUY_ORDERS:
      console.log("gettig buying orders", datastore.getOrdersByType(1));
      handler.reply(null, {
        ...response(200, MESSAGES.SUCCESS),
        data: datastore.getOrdersByType(1),
      });
      break;
    case REQUESTS.GET_SELL_ORDERS:
      console.log("gettig selling orders", datastore.getOrdersByType(2));
      handler.reply(null, {
        ...response(200, MESSAGES.SUCCESS),
        data: datastore.getOrdersByType(2),
      });
      break;
    case REQUESTS.CREATE_BUY_ORDER:
      console.log("create buy order", datastore.publishOrder(payload));
      handler.reply(null, {
        ...response(200, MESSAGES.SUCCESS),
        data: datastore.getOrders(),
      });
      break;
    default:
      logger(400, MESSAGES.INVALID_REQUEST);
  }
};

module.exports = requestProxy;

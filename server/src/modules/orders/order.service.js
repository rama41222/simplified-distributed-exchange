const OrderType = require("./type.model");

module.exports = () => {
  let orders = new Array();

  removeOrder = (id) => {
    orders.filter((order) => order.id !== id);
  };

  getOrders = () => {
    return orders;
  };

  getOrderById = (id) => {
    return orders.find((order) => order.id === id) || {};
  };

  getOrdersByType = (type) => {
    return orders.find((order) => order.type === OrderType.types[1]) || [];
  };

  publishOrder = (order) => {
    orders.push(order);
    return order;
  };

  /**
   * Sync orderbook with the server
   * @date 2021-07-10
   * @param {[Order]} orderBook
   * @returns {void}
   */
  syncOrder = (orderBook) => {
    orders = orderBook;
  };

  return {
    syncOrder,
    publishOrder,
    getOrders,
    removeOrder,
    getOrderById,
    getOrdersByType,
    sellOrder,
    buyOrder,
  };
};

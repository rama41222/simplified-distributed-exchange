/**
 * This function will  process the transactions and arrange the order book
 * @date 2021-07-11
 * @param {any} type: Transaction Type
 * @param {OrderService} datastore: Order Service
 * @param {Order} payload: Order
 * @returns {void}
 */
const transactionProcessor = (datastore, payload) => {
    console.log('params:', datastore);
  /**
   * {
   *   id: 'bea471ad-f8f2-4ba0-8e13-02e25a89fac0',
   *   clientId: 'client1',
   *   type: 'BUY',
   *   amount: 0,
   *   price: 221,
   *   total: 221
   * }
   *
   * {
   *   id: 'bea471ad-f8f2-4ba0-8e13-02e25a89fac0',
   *   clientId: 'client1',
   *   type: 'Sell',
   *   amount: 99,
   *   price: 221,
   *   total: 22001
   * }
   */
  const allBooks = datastore.getOrders();
  const updatedBooks = allBooks.map((order) => {
    /** Skip own Transactions */
    if (order.clientId === payload.clientId) {
      return order;
    }
    /** Get the Selling to buy and buying to sell orders */
    if (payload.type !== order.type) {
      return order;
    }

    /** 
     * Available Opposite Order amount should be greater than requested amount 
     * Requested price === Available opposite order price
     * */
    if (order.amount >= payload.amount && payload.price === order.price) {
      const orderAmount = order.amount;
      const payloadAmount = payload.amount;
      const newOrderAmount = orderAmount - payloadAmount;
      payload.amount = 0;
      payload.total = 0;
      order.amount = newOrderAmount;
      order.total = newOrderAmount * order.price;
      console.log('order:', order);
      return order;
    }
  });

  /** Sync with server store */
  datastore.syncOrder(updatedBooks);
  /** Publish the processed order */
  datastore.publishOrder(payload);
};

module.exports = transactionProcessor;

const { types } = require('../orders/type.model');
const OrderType = require('./type.model');

module.exports = () => {
    
    let orders = new Array();
    
    /**
     * Order Cancellation
     * @date 2021-07-10
     * @param {any} id: order uuid
     * @returns {any}
     */
    removeOrder = (id) => {
        orders.filter(order => (order.id !== id));
    }
    
    /**
     * Returns all Orders
     * @date 2021-07-10
     * @returns {[Order]}
     */
    getOrders = () => {
        return orders;
    }
    
    /**
     * Return an order by id
     * @date 2021-07-10
     * @param {string} id: uuid
     * @returns {Order}
     */
    getOrderById = (id) => {
        return orders.find(order => (order.id === id)) || {};
    }
    
    
    /**
     * Returns orders by type
     * @date 2021-07-10
     * @param {OrderType} type
     * @returns {[Order]}
     */
    getOrdersByType = (type) => {
        return orders.find(order => (order.type === OrderType.types[types])) || [];
    }

    /**
     * Creates a order
     * @date 2021-07-10
     * @param {Order} order
     * @returns {void}
     */
    publishOrder = (order) => {
        orders.push(order)
    }

    /**
     * Sync orderbook with the server
     * @date 2021-07-10
     * @param {[Order]} orderBook
     * @returns {void}
     */
    syncOrder = (orderBook) => {
        orders = orderBook;
    }
        
    return {
        publishOrder,
        getOrders,
        removeOrder,
        getOrderById,
        getOrdersByType,
        syncOrder
    }
}
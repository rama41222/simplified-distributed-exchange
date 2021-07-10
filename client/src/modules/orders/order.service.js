const OrderType = require('./type.model');

module.exports = () => {
    
    let orders = new Array();
    
    removeOrder = (id) => {
        orders.filter(order => (order.id !== id));
    }
    
    getOrders = () => {
        return orders;
    }
    
    getOrderById = (id) => {
        return orders.find(order => (order.id === id)) || {};
    }
    
    getOrdersByType = (type) => {
        return orders.find(order => (order.type === OrderType.types[1])) || [];
    }

    publishOrder = (order) => {
        orders.push(order)
    }
        
    return {
        publishOrder,
        getOrders,
        removeOrder,
        getOrderById,
        getOrdersByType
    }
}
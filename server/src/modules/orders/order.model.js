const uuid = require('uuid/v4');
const OrderType = require('./type.model');

class Order {
    constructor(type, amount, price, total, clientId) {
        this.id = uuid();
        this.type = OrderType.types[type];
        this.clientId = clientId;
        this.amount = amount;
        this.price = price;
        this.total = total;
  }
}

module.exports = Order;
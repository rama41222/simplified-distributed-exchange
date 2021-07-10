const uuid = require('uuid/v4');
const OrderType = require('./type.model');

class Order {
    constructor(type, amount, price, total, clientId) {
        this.id = uuid();
        this.clientId = clientId;
        this.type = OrderType.types[1];
        this.amount = amount;
        this.price = price;
        this.total = total;
  }
}

module.exports = Order;
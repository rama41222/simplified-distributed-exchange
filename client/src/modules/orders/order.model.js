const uuid = require('uuid/v4');
const OrderType = require('./type.model');

class Order {
    constructor(type, amount, price, total) {
        this.id = uuid();
        this.type = OrderType.types[1];
        this.amount = amount;
        this.price = price;
        this.total = total;
  }
}

console.log('order created', new Order(1,23,2, 23*2))
module.exports = Order;
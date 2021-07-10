const uuid = require("uuid/v4");
const OrderType = require("./type.model");

/**
 * Model for creating an order in the order book
 * @date 2021-07-10
 * @returns {Order}
 */
class Order {
  constructor(type, amount, price, total, clientId) {
   
    /** uuid for transaction */
    this.id = uuid();

    /** clientId of transaction node*/
    this.clientId = clientId;

    /** Order Type*/
    this.type = OrderType.types[type];

    /** Amount of currency needed*/
    this.amount = amount;

    /** Exchange rate */
    this.price = price;

    /** Total cost of tansaction */
    this.total = total;
  }
}

module.exports = Order;

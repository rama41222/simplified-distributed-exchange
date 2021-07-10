const uuid = require("uuid/v4");
const OrderType = require("./type.model");

class Order {
  constructor(type, amount, price, total, clientId) {
    /** uuid for transaction */
    this.id = uuid();

    /** clientId of transaction node*/
    this.clientId = clientId;

    /** Order Type*/
    this.type = OrderType.types[1];

    /** Amount of currency needed*/
    this.amount = amount;

    /** Exchange rate */
    this.price = price;

    /** Total cost of tansaction */
    this.total = total;
  }
}
module.exports = Order;

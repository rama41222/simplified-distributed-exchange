
/**
 * @model OrderType
 * Order Types: [Buy, Sell]
 */
class OrderType {
    static types = {
        1: 'BUY',
        2: 'SELL'
    }
}

module.exports = OrderType;
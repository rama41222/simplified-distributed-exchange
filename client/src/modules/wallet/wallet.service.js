const CurrencyType = require('./currency-type.model');

module.exports = () => {
    /**
     * Wallet
     */
    let wallet = new Map();
    
    /**
     * Initialize to zero
     */
    init = () => {
        wallet.set(CurrencyType.types[1], 0);
        wallet.set(CurrencyType.types[2], 0);
    }

    /**
     * Return the wallet
     * @date 2021-07-10
     * @returns {Wallet}
     */
    getWallet = () => {
        return wallet;
    }

    /**
     * Get the balancy based on currency type
     * @date 2021-07-10
     * @param {any} type Currency type
     * @returns {Wallet}
     */
    getBalance = (type) => {
        return wallet.get(CurrencyType.types[type]);
    }
    

    /**
     * Returns the wallet after balance
     * @date 2021-07-10
     * @param {CurrencyType} type: Currency type
     * @param {float} amount
     * @returns {Wallet}
     */
    deposit = (type, amount) => {

        if (amount <=0) {
            return -1;
        }

        const currentBalance = wallet.get(CurrencyType.types[type]);
        const balanceAfter = currentBalance + amount;

        return wallet.set(CurrencyType.types[type], balanceAfter);
    }

    /**
     * Withdraw from personal wallet
     * @date 2021-07-10
     * @param {any} type Currentcy Type
     * @param {float} amount amount to withdraw
     * @returns {Wallet}
     */
    withdraw = (type, amount) => {
        
        if (amount <=0) {
            return -1;
        }

        const currentBalance = wallet.get(CurrencyType.types[type]);
        const balanceAfter = currentBalance - amount;

        if(balanceAfter < 0) {
            return -2;
        }
        wallet.set(CurrencyType.types[type], balanceAfter);
        return balanceAfter;
    }
     
    // Initialize the wallet to zero
    init();
    return {
        deposit,
        getWallet,
        withdraw,
        getBalance
    }
}
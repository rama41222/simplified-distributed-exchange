const CurrencyType = require('./currency-type.model');

module.exports = () => {
    
    let wallet = new Map();
    
    init = () => {
        wallet.set(CurrencyType.types[1], 0);
        wallet.set(CurrencyType.types[2], 0);
    }

    getWallet = () => {
        return wallet;
    }
    
    deposit = (type, amount) => {

        if (amount <=0) {
            return -1;
        }
        
        const currentBalance = wallet.get(CurrencyType.types[type]);
        const balanceAfter = currentBalance + amount;

        return wallet.set(CurrencyType.types[type], balanceAfter);
    }

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
        return amount;
    }
     
    init();
    return {
        deposit,
        getWallet,
        withdraw
    }
}
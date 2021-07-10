# simplified-distributed-exchange
A simplified distributed crypto exchage

## Setup
```bash

# Clone the repo
git clone git@github.com:rama41222/simplified-distributed-exchange.git

# Install required packages
npm i

# Run the grape discovery servers
./node_modules/.bin/grape --dp 20001 --aph 30001 --bn '127.0.0.1:20002'
./node_modules/.bin/grape --dp 20002 --aph 40001 --bn '127.0.0.1:20001'

# Run the server
node ./server/src/server.js 

# Run the client
node ./client/src/client.js 
```

**Create as much clients as you like and try to execute transactions**

**Also utiloze the workflows to execute transactions**

```javascript
const buyOrders = await Promise.all[
    (createBuyOrder(1, 221, 1, peer, WalletService, OrderService, clientName),
    createBuyOrder(1, 220, 2, peer, WalletService, OrderService, clientName),
    createBuyOrder(2, 1, 120, peer, WalletService, OrderService, clientName),
    createBuyOrder(2, 1, 300, peer, WalletService, OrderService, clientName),
    createBuyOrder(2, 0.9, 223, peer, WalletService, OrderService, clientName),
    createBuyOrder(2, 1.1, 120, peer, WalletService, OrderService, clientName))
  ];

  /** Create Sell Order */
  const sellOrders = await Promise.all[
    (createSellOrder(2, 1, 1000, peer, WalletService, OrderService, clientName),
    createSellOrder(2, 1, 20000, peer, WalletService, OrderService, clientName),
    createSellOrder(1, 220, 120, peer, WalletService, OrderService, clientName),
    createSellOrder(1, 112, 300, peer, WalletService, OrderService, clientName),
    createSellOrder(1, 900, 223, peer, WalletService, OrderService, clientName),
    createSellOrder(1, 221, 120, peer, WalletService, OrderService, clientName))
  ];
```

## Done

[X] Establish the network

[X] Create a request-response interface between servers and clients

[X] Handshake, Fetch orders, Fetch Selling Orders, Fetch Buying orders

[X] Documentation

[X] Order Creation

[X] Order Execution from server (Via automation task );

[X] Broadcasting to all the clients (Syncing the books in the network)

## Todo

[ ] Handle race conditions by possibly using a QUEUE datastructure

[ ] Handle wallet update after transaction from client side

[ ] Unit tests (No TDD)

[X] Documentation

[ ] Rewire in Typescript

[ ] Move Endpoints to dot env

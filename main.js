const { BlockChain, Transaction } = require("./blockchain");

let fkcoin = new BlockChain();
fkcoin.createTransaction(new Transaction('address1', 'address2', 100));
fkcoin.createTransaction(new Transaction('address2', 'address1', 50));

console.log("\nStarting miner...");
fkcoin.minePendingTransactions("fvkramer");

console.log("\nBalance of miner is", fkcoin.getBalanceOfAddress("fvkramer"));

const SHA256 = require('crypto-js/sha256');

class Block {
  constructor(index, timestamp, data, previousHash = '') {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
  }
}

class BlockChain{
  constructor() {
    this.chain = [this.createGenesisBlock()];  //first block on blockchain is genesis block
  }

  createGenesisBlock() {
    return new Block(0, "01/01/2019", "Genesis Block", "0");
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    //anytime properties of block contructor changed, hash needs to be recalculated
    newBlock.hash = newBlock.calculateHash();
    this.chain.push(newBlock);
  }

  isChainValid() {
    for(let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }

    return true;
  }

}

let fkcoin = new BlockChain();
fkcoin.addBlock(new Block(1, "01/01/2019", {amt: 4}));
fkcoin.addBlock(new Block(2, "01/01/2019", {amt: 10}));

// console.log(JSON.stringify(fkcoin, null, 4));

fkcoin.chain[1].data = { amt: 100};
console.log('Is chain valid? ' + fkcoin.isChainValid());
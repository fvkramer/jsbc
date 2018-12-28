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
  }
}
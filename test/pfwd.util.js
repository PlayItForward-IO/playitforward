const { BN, constants, expectEvent } = require("@openzeppelin/test-helpers");

module.exports = {
  name: "PlayItForward",
  symbol: "PFWD",
  decimals: 18,
  totalSupply: 1000000,
  zeroAddress: constants.ZERO_ADDRESS,
  expectEvent,
  toEth: (balance) => web3.utils.fromWei(balance.toString()).toString(),
  toWei: (balance) => web3.utils.toWei(balance.toString()).toString(),
};

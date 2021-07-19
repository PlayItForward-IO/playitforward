const { BN, constants, expectEvent } = require("@openzeppelin/test-helpers");
const PlayItForward = artifacts.require("PlayItForward");
const { expect } = require("chai");

contract("PlayItForward", (accounts) => {
  const [deployer, recipient] = accounts;
  const owner = deployer;

  const name = "PlayItForward";
  const symbol = "PFWD";
  const decimals = 18;
  const totalSupply = 1000000;

  const toEth = (balance) =>
    web3.utils.fromWei(balance.toString(), "ether").toString();
  const toWei = (balance) =>
    web3.utils.toWei(balance.toString(), "ether").toString();

  const { ZERO_ADDRESS } = constants;

  before(async () => {
    pfwd = await PlayItForward.deployed();
  });

  describe("Maintenance", function () {
    it("holders can burn their tokens", async function () {
      assert.equal(toEth(await pfwd.balanceOf(owner)), `${totalSupply}`);
      const amount = toWei(totalSupply);
      const receipt = await pfwd.burn(amount, { from: owner });
      // const foo = expectEvent(receipt, "Transfer", {
      //   from: owner,
      //   to: ZERO_ADDRESS,
      //   value: amount,
      // });
      // console.log(foo);
      // expect(await pfwd.balanceOf(owner)).to.be.bignumber.equal("0");
    });
  });
});

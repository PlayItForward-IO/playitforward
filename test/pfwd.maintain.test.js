const { BN, constants, expectEvent } = require("@openzeppelin/test-helpers");
const PlayItForward = artifacts.require("PlayItForward");
const { expect } = require("chai");

contract("PlayItForward Token", (accounts) => {
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
      expectEvent(receipt, "Transfer", {
        from: owner,
        to: ZERO_ADDRESS,
        value: amount,
      });
      assert.equal(toEth(await pfwd.balanceOf(owner)), 0);
      console.log(toEth(await pfwd.balanceOf(owner)));
    });

    it("holders cannot burn tokens they don't have", async function () {
      assert.equal(toEth(await pfwd.balanceOf(owner)), 0);
      const amount = toWei(1);
      try {
        await pfwd.burn(amount, { from: owner });
      } catch (error) {
        assert.equal(
          error.message.includes("burn amount exceeds balance"),
          true
        );
      }
      assert.equal(toEth(await pfwd.balanceOf(owner)), 0);
    });
  });
});

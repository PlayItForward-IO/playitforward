const { BN, constants, expectEvent } = require("@openzeppelin/test-helpers");
const PlayItForward = artifacts.require("PlayItForward");

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

  describe("Actions", function () {
    before(async () => {
      pfwd = await PlayItForward.deployed();
    });

    it(`can transfer ${totalSupply / 2} token to a recipient `, async () => {
      const amount = toWei(totalSupply / 2);
      await pfwd.transfer(recipient, amount);
      assert.equal(
        toEth(await pfwd.balanceOf(recipient)),
        `${totalSupply / 2}`
      );
    });

    it(`can transfer all tokens to a recipient `, async () => {
      const amount = toWei(totalSupply / 2);
      await pfwd.transfer(recipient, amount);
      assert.equal(toEth(await pfwd.balanceOf(recipient)), `${totalSupply}`);
    });

    it(`cannot transfer more tokens that owner has `, async () => {
      // owner has no tokens anymore
      assert.equal(toEth(await pfwd.balanceOf(owner)), "0");

      // we have spend all tokens so we can't transfer more, not even 1
      const amount = toWei(1);

      try {
        await pfwd.transfer(recipient, amount);
      } catch (error) {
        assert.equal(
          error.message.includes("transfer amount exceeds balance"),
          true
        );
      }

      // recipient's balance should not have changed
      assert.equal(toEth(await pfwd.balanceOf(recipient)), `${totalSupply}`);
    });
  });
});

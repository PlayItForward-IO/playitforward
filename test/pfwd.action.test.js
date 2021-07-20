const util = require('./pfwd.util.js');
const PlayItForward = artifacts.require('PlayItForward');

contract('PlayItForward Token', (accounts) => {
  const [deployer, recipient] = accounts;
  const owner = deployer;

  before(async () => {
    pfwd = await PlayItForward.deployed();
  });

  describe('Actions', function () {
    before(async () => {
      pfwd = await PlayItForward.deployed();
    });

    it(`can transfer ${util.totalSupply / 2} token to a recipient`, async () => {
      const amount = util.toWei(util.totalSupply / 2);
      await pfwd.transfer(recipient, amount);
      assert.equal(util.toEth(await pfwd.balanceOf(recipient)), `${util.totalSupply / 2}`);
    });

    it(`can transfer all tokens to a recipient`, async () => {
      const amount = util.toWei(util.totalSupply / 2);
      await pfwd.transfer(recipient, amount);
      assert.equal(util.toEth(await pfwd.balanceOf(recipient)), `${util.totalSupply}`);
    });

    it(`cannot transfer more tokens than the deployer owns`, async () => {
      // owner has no tokens anymore
      assert.equal(util.toEth(await pfwd.balanceOf(owner)), '0');

      // we have spend all tokens so we can't transfer more, not even 1
      const amount = util.toWei(1);

      try {
        await pfwd.transfer(recipient, amount);
      } catch (error) {
        assert.equal(error.message.includes('transfer amount exceeds balance'), true);
      }

      // recipient's balance should not have changed
      assert.equal(util.toEth(await pfwd.balanceOf(recipient)), `${util.totalSupply}`);
    });
  });
});

const util = require('./pfwd.util.js');
const PlayItForward = artifacts.require('PlayItForward');

contract('PlayItForward Token', (accounts) => {
  const [deployer, recipient] = accounts;
  const owner = deployer;

  before(async () => {
    pfwd = await PlayItForward.deployed();
  });

  describe('Maintenance', function () {
    it('holders can burn their tokens', async function () {
      assert.equal(util.toEth(await pfwd.balanceOf(owner)), `${util.totalSupply}`);
      const amount = util.toWei(util.totalSupply);
      const receipt = await pfwd.burn(amount, { from: owner });
      util.expectEvent(receipt, 'Transfer', { from: owner, to: util.zeroAddress, value: amount });
      assert.equal(util.toEth(await pfwd.balanceOf(owner)), 0);
    });

    it("holders cannot burn tokens they don't have", async function () {
      assert.equal(util.toEth(await pfwd.balanceOf(owner)), 0);
      const amount = util.toWei(1);
      try {
        await pfwd.burn(amount, { from: owner });
      } catch (error) {
        assert.equal(error.message.includes('burn amount exceeds balance'), true);
      }
      assert.equal(util.toEth(await pfwd.balanceOf(owner)), 0);
    });
  });
});

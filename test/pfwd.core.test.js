const util = require('./pfwd.util.js');
const PlayItForward = artifacts.require('PlayItForward');

contract('PlayItForward Token', (accounts) => {
  const [deployer, recipient] = accounts;
  const owner = deployer;

  before(async () => {
    pfwd = await PlayItForward.deployed();
  });

  describe('Core', function () {
    it(`has ${util.name} as name`, async () => {
      assert.equal(await pfwd.name(), util.name);
    });

    it(`has ${util.symbol} as symbol`, async () => {
      assert.equal(await pfwd.symbol(), util.symbol);
    });

    it(`has ${util.decimals} decimals`, async () => {
      assert.equal(await pfwd.decimals(), `${util.decimals}`);
    });

    it(`has minted ${util.totalSupply} token on deploy`, async () => {
      assert.equal(util.toEth(await pfwd.totalSupply()), `${util.totalSupply}`);
    });

    it(`has assigned ${util.totalSupply} token to deployer (owner)`, async () => {
      assert.equal(util.toEth(await pfwd.balanceOf(deployer)), `${util.totalSupply}`);
    });

    it('has made the total supply immutable (mint api removed)', async () => {
      try {
        await pfwd.mint(recipient, `${util.totalSupply}`);
      } catch (error) {
        assert.equal(error.message.includes('pfwd.mint is not a function'), true);
      }
    });
  });
});

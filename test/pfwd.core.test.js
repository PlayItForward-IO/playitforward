const { constants } = require("@openzeppelin/test-helpers");
const PlayItForward = artifacts.require("PlayItForward");

contract("PlayItForward Token", (accounts) => {
  const [deployer, recipient] = accounts;
  const owner = deployer;

  const name = "PlayItForward";
  const symbol = "PFWD";
  const decimals = 18;
  const totalSupply = 1000000;

  const toEth = (balance) => web3.utils.fromWei(balance, "ether").toString();

  before(async () => {
    pfwd = await PlayItForward.deployed();
  });

  describe("Core", function () {
    it(`has ${name} as name`, async () => {
      assert.equal(await pfwd.name(), name);
    });

    it(`has ${symbol} as symbol`, async () => {
      assert.equal(await pfwd.symbol(), symbol);
    });

    it(`has ${decimals} decimals`, async () => {
      assert.equal(await pfwd.decimals(), `${decimals}`);
    });

    it(`has minted ${totalSupply} token on deploy`, async () => {
      assert.equal(toEth(await pfwd.totalSupply()), `${totalSupply}`);
    });

    it(`has assigned ${totalSupply} token to deployer (owner)`, async () => {
      assert.equal(toEth(await pfwd.balanceOf(deployer)), `${totalSupply}`);
    });

    it("has made the total supply immutable (mint api removed)", async () => {
      try {
        await pfwd.mint(recipient, `${totalSupply}`);
      } catch (error) {
        assert.equal(
          error.message.includes("pfwd.mint is not a function"),
          true
        );
      }
    });
  });
});

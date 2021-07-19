const PlayItForward = artifacts.require('PlayItForward');

contract("PlayItForward", (accounts) => {
    // console.log(accounts);
    const toEth = (balance) => web3.utils.fromWei(balance);

    beforeEach(async () => {
        pfwd = await PlayItForward.deployed();
    });

    it("should should create the token with proper name", async () => {
        const name = await pfwd.name.call();
        assert.equal(name, 'PlayItForward');
    });

    it("should should create the token with proper symbol", async () => {
        const symbol = await pfwd.symbol.call();
        assert.equal(symbol, 'PFWD');
    });

    it("should mint the total supply of 1M token on deploy", async () => {
        const balance = await pfwd.totalSupply.call();
        assert.equal(toEth(balance), '1000000');
    });

    it("should mint the total supply of 1M token on deploy and transfer it to the owner", async () => {
        const balance = await pfwd.balanceOf.call(accounts[0]);
        assert.equal(toEth(balance), '1000000');
    });
});
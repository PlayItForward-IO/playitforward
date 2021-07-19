const PlayItForward = artifacts.require('PlayItForward');

contract("PlayItForward", (accounts) => {
    // console.log(accounts);
    const toEth = (balance) => web3.utils.fromWei(balance);

    beforeEach(async () => {
        pfwd = await PlayItForward.deployed();
    });

    it("should create the token with the name `PlayItForward`", async () => {
        const name = await pfwd.name.call();
        assert.equal(name, 'PlayItForward');
    });

    it("should create the token with the symbol `PFWD`", async () => {
        const symbol = await pfwd.symbol.call();
        assert.equal(symbol, 'PFWD');
    });

    it("should create the token with 18 decimal points", async () => {
        const decimals = await pfwd.decimals.call();
        assert.equal(decimals, '18');
    });

    it("should mint a total supply of 1M token on deploy", async () => {
        const balance = await pfwd.totalSupply.call();
        assert.equal(toEth(balance), '1000000');
    });

    it("should mint a total supply of 1M token & transfer to owner on deploy", async () => {
        const balance = await pfwd.balanceOf.call(accounts[0]);
        assert.equal(toEth(balance), '1000000');
    });

    it("should ensure the total supply of 1M token is immutable", async () => {
        try {
            await pfwd.mint(accounts[0], '1000000')
        }
        catch (error) {
            assert.equal(error.message, 'pfwd.mint is not a function');
        }
    });
});
const PlayItForward = artifacts.require('PlayItForward');

contract("PlayItForward", (accounts) => {
    const [deployer, recipient] = accounts;
    const owner = deployer

    const name = 'PlayItForward';
    const symbol = 'PFWD';
    const decimals = 18;
    const totalSupply = 1000000;

    const toEth = (balance) => web3.utils.fromWei(balance, 'ether');
    const toWei = (balance) => web3.utils.toWei(balance, 'ether');


    before(async () => {
        pfwd = await PlayItForward.deployed();
    });

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

    it(`has assigned ${totalSupply} token to owner (deployer) `, async () => {
        assert.equal(toEth(await pfwd.balanceOf(deployer)), `${totalSupply}`);
    });

    it("has make the total supply immutable (mint api removed)", async () => {
        try {
            await pfwd.mint(recipient, `${totalSupply}`)
        }
        catch (error) {
            assert.equal(error.message, 'pfwd.mint is not a function');
        }
    });
});
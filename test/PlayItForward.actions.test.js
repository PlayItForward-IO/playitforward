const PlayItForward = artifacts.require('PlayItForward');

contract("PlayItForward:Actions", (accounts) => {
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

    it(`has the ability to transfer ${totalSupply/2} token to a recipient `, async () => {
        await pfwd.transfer(recipient, `${totalSupply/2}`);
        assert.equal(toEth(await pfwd.balanceOf(recipient)), `${totalSupply/2}`);
    });

});
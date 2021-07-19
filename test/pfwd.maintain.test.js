const { BN, constants, expectEvent } = require('@openzeppelin/test-helpers');
const PlayItForward = artifacts.require('PlayItForward');

contract("PlayItForward", (accounts) => {
    const [deployer, recipient] = accounts;
    const owner = deployer

    const name = 'PlayItForward';
    const symbol = 'PFWD';
    const decimals = 18;
    const totalSupply = 1000000;

    const toEth = (balance) => web3.utils.fromWei(balance, 'ether').toString();
    const toWei = (balance) => web3.utils.toWei(balance, 'ether').toString();

    const { ZERO_ADDRESS } = constants;

    describe('Maintenance', function () {
        before(async () => {
            pfwd = await PlayItForward.deployed();
        });
        
        it('holders can burn their tokens', async function () {
            console.log(await pfwd.balanceOf(owner))
            const amount = new BN(totalSupply);
            const receipt = await pfwd.burn(amount, { from: owner });
            expectEvent(receipt, 'Transfer', { from: owner, to: ZERO_ADDRESS, value: amount });
        });
    });
});
// contracts/PlayItForward.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

// Import ERC20Burnable from the OpenZeppelin Contracts library
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

string constant _tokenName = "PlayItForward";
string constant _tokenSymbol = "PFWD";
uint256 constant _totalFixeDSupply = 1000000;
uint256 constant _totalDecimalPoints = 18; // 18 decimal points
uint256 constant _totalDecimals = 10**_totalDecimalPoints; //the relationship between Ether and Wei

/**
 * @dev {PlayItForward} token, including:
 *
 *  - Mint the fixed supply of 1,00,000,000 tokens on creation (deflationary mechnism)
 *  - Disable future goverance by limiiting access control mechanism (for minting/pausing)
 *  - Enable the ability for holders to burn (aka destroy) their tokens
 *
 * This contract uses {ERC20Burnable} to include burn capabilities
 *
 */
contract PlayItForward is ERC20Burnable {
    /**
     * @dev Mints `fixedSupply` amount of token and transfers them to `owner`.
     *
     * See {ERC20-constructor}.
     */
    constructor() ERC20(_tokenName, _tokenSymbol) {
        _mint(msg.sender, _totalFixeDSupply * _totalDecimals);
    }
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract GamesToken is ERC20 {
    constructor() ERC20("GamesToken", "GT") {
        _mint(msg.sender, 1000000 * (10 ** uint256(decimals())));
    }

   function transferTokens(address from, address to, uint256 amount) public {
    _transfer(from, to, amount * (10 ** uint256(decimals())));
}
}
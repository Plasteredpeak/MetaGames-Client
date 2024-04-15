// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract GamesToken is ERC20, Ownable {
    constructor() Ownable(msg.sender) ERC20("GamesToken", "GT") {
        _mint(msg.sender, 1000000 * (10 ** uint256(decimals())));
    }

    function transferTokens(uint256 amount) public {
    _transfer(msg.sender, owner(), amount * (10 ** uint256(decimals())));
}

    function requestTokens(uint256 amount) public {
        _transfer(owner(), msg.sender, amount * (10 ** uint256(decimals())));
    }
}
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Game {
    struct GameItem {
        string gameID;
        string name;
        string price;
        address owner;
    }

    GameItem[] public gameItems;

    function addGame(string memory _gameID, string memory _name, string memory _price) public {
        gameItems.push(GameItem(_gameID, _name, _price, msg.sender));
    }

    function getGameByGameID(string memory _gameID) public view returns (string memory, string memory, string memory, address) {
        for (uint256 i = 0; i < gameItems.length; i++) {
            if (keccak256(bytes(gameItems[i].gameID)) == keccak256(bytes(_gameID))) {
                GameItem memory game = gameItems[i];
                return (game.gameID, game.name, game.price, game.owner);
            }
        }
        revert("Game not found");
    }

    function getGamesByOwner(address _owner) public view returns (string[] memory, string[] memory, string[] memory) {
        uint256 ownerCount = 0;
        for (uint256 i = 0; i < gameItems.length; i++) {
            if (gameItems[i].owner == _owner) {
                ownerCount++;
            }
        }

        string[] memory gameIDs = new string[](ownerCount);
        string[] memory names = new string[](ownerCount);
        string[] memory prices = new string[](ownerCount);

        uint256 index = 0;
        for (uint256 i = 0; i < gameItems.length; i++) {
            if (gameItems[i].owner == _owner) {
                gameIDs[index] = gameItems[i].gameID;
                names[index] = gameItems[i].name;
                prices[index] = gameItems[i].price;
                index++;
            }
        }

        return (gameIDs, names, prices);
    }

    function isGameOwnedBy(string memory _gameID) public view returns (bool) {
        address sender = msg.sender;
        for (uint256 i = 0; i < gameItems.length; i++) {
            if (keccak256(bytes(gameItems[i].gameID)) == keccak256(bytes(_gameID)) && gameItems[i].owner == sender) {
                return true;
            }
        }
        return false;
    }
}

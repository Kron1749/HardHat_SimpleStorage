//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.7;

import "hardhat/console.sol";

contract SimpleStorage {
    uint256 index;

    struct People {
        uint256 index;
        uint256 favoriteNumber;
        string name;
        uint256 age;
    }

    People[] public people;

    uint256 favoriteNumber;

    function store(uint256 _favoriteNumber) public {
        favoriteNumber = _favoriteNumber;
    }

    function retrieve() public view returns (uint256) {
        return favoriteNumber;
    }

    function retrieveIndex() public view returns (uint256) {
        return index;
    }

    function addPerson(
        uint256 _favoriteNumber,
        string memory _name,
        uint256 _age
    ) public {
        people.push(People(index, _favoriteNumber, _name, _age));
        index++;
    }

    function deletePerson(uint256 _index) public returns (bool success) {
        uint256 indexToDelete = 0;
        require(index <= people.length, "there is no such index");
        for (uint256 i = 0; i < people.length - 1; i++) {
            if (_index == people[i].index) {
                indexToDelete = i;
            }
        }
        delete people[indexToDelete];
        return true;
    }
}

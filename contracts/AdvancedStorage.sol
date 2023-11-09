// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.0;

contract AdvancedStorage {

    uint[] public ids;

    function add(uint id) public {
        ids.push(id);
    }

    function get(uint index) view public returns(uint) {
        return ids[index];
    }

    function getAll() view public returns(uint[] memory) {
        return ids;
    }

    function length() view public returns(uint) {
        return ids.length;
    }

}
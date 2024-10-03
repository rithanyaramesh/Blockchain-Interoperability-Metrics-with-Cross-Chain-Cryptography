// contracts/AtomicSwap.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AtomicSwap {
    struct Swap {
        address sender;
        address receiver;
        string data;
        bool completed;
    }

    mapping(bytes32 => Swap) public swaps;

    function createSwap(bytes32 _hash, address _receiver, string memory _data) public {
        require(swaps[_hash].sender == address(0), "Swap already exists");
        swaps[_hash] = Swap(msg.sender, _receiver, _data, false);
    }

    function completeSwap(bytes32 _hash, string memory _secret) public {
        require(keccak256(abi.encodePacked(_secret)) == _hash, "Invalid secret");
        Swap memory swap = swaps[_hash];
        require(!swap.completed, "Swap already completed");
        require(swap.receiver == msg.sender, "Not authorized");

        // Transfer data (or any other asset)
        swaps[_hash].completed = true;
    }
}

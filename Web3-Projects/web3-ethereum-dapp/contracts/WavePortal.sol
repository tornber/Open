// SPDX-License-Identifier: UNLICENSED

pragma solidity 0.8.17;

import 'hardhat/console.sol';

// deployed address 0x65732b5F11602aC51574eF073063F4009e615963

contract WavePortal {

    uint256 totalWaves;
    address[] wavers;
    mapping(address => uint) waversWaveCount;
    uint256 private seed;
    mapping(address => uint256) lastWavedAt; 

    event NewWave(address indexed from,uint256 timestamp,string message);

    struct Wave {
        address waver;
        string message;
        uint256 timestamp;
    }

    Wave[] waves;
    

    constructor() payable {
        console.log('my first smart contract');
        seed = (block.difficulty + block.timestamp) % 100;
    }

    function wave(string memory _message) public {
        require(lastWavedAt[msg.sender] + 15 minutes < block.timestamp,"wait for 15 minutes");
        lastWavedAt[msg.sender] = block.timestamp;
        wavers.push(msg.sender);
        waversWaveCount[msg.sender] += 1;
        totalWaves++;
        waves.push(Wave(msg.sender,_message,block.timestamp));
        console.log('%s has waved',msg.sender);

        seed = (block.difficulty + block.timestamp) % 100;
        console.log('Random # generated %d',seed);

        if(seed < 50) {
            console.log('%s won!',msg.sender);
            uint256 prizeAmount = 0.0001 ether;
            require(prizeAmount <= address(this).balance,"not enought money for sending funds");

            (bool success,) = (msg.sender).call{value:prizeAmount}("");
            require(success,"failed to withdraw money from contract");
        }
        emit NewWave(msg.sender,block.timestamp,_message);
    }

    function getWaves() public view returns(Wave[] memory) {
        return waves;
    }

    function getWavesCount() public view returns(uint256) {
        console.log('we have %d waves received',totalWaves);
        return totalWaves;
    }

    receive() external payable {
        console.log('funds received',msg.value);
    }
}
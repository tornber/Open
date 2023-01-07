//SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;


// contract address at goerli testnet 0xe63bd624f95678cc7355f1be3e1a28d1c8ad69e8

contract Employer {

    address public owner;
    string public employerUsername;
    mapping(address => uint) public personsDeposits;

    event FundsRecieved (
        address sender,
        uint256 fundAmount
    );

    modifier onlyOwner() {
        require(msg.sender == owner,"only owner can call this function");
        _;
    }
    

    constructor(string memory username) public {
        owner = msg.sender;
        employerUsername = username;
    }

    fallback() external payable {
        emit FundsRecieved(msg.sender,msg.value);
    }

    receive() external payable {
        emit FundsRecieved(msg.sender,msg.value);
    }

    function deposit() external payable {
        personsDeposits[msg.sender] += msg.value;
        emit FundsRecieved(msg.sender,msg.value);
    }

    function withDraw() external onlyOwner {
        payable(msg.sender).transfer(address(this).balance);
    }

    function sendFunds(address payable _address) external payable onlyOwner {
        bool sent = _address.send(msg.value);
        require(sent,"Failure, funds not sent");
    }

    function fundsTransferToStorage(address _storageAddress,address payable _workerAddress) public payable onlyOwner {
        require(msg.value > 0,"can not exchange funds with thero value");

        (bool sent,bytes memory data) = _storageAddress.call{value: msg.value,gas: 50000}(abi.encodeWithSignature("deposit(address,uint256)",_workerAddress,msg.value));
        require(sent,"Failure, funds not sent");
    }

    function confirmRevenue(address _storageAddress,bool _access) external onlyOwner {
        (bool sent,) = _storageAddress.call(abi.encodeWithSignature("accessWithdraw(bool)",_access));
        require(sent,"Failure, acces on revenue does't changed");
    }

}
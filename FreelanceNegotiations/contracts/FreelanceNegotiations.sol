//SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

// employer contract address at goerli testnet 0xe63bd624f95678cc7355f1be3e1a28d1c8ad69e8
// storage contract address at goerli testnet 0x40264dfa327d8578323703b0e5e3ef03383ae156

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

contract Storage {

    address public owner;
    mapping(address => WorkerRevenue) public storageDeposits;
    uint256[] public deposits;

    struct WorkerRevenue {
        bool employerConfirm;
        uint revenue;
        address payable workerAddress;
    }

    event FundsRecieved (
        address sender,
        uint256 fundAmount
    );

    modifier onlyOwner() {
        require(msg.sender == owner,"only owner can call this function");
        _;
    }

    constructor() public {
        owner = msg.sender;
    }

    fallback() external payable {
        emit FundsRecieved(msg.sender,msg.value);
    }

    receive() external payable {
        emit FundsRecieved(msg.sender,msg.value);

    }

    function accessWithdraw(bool _access) external {
        storageDeposits[msg.sender].employerConfirm = _access;
    }

    function deposit(address payable _workerAddress,uint256 _revenue) external payable {
        storageDeposits[msg.sender] = WorkerRevenue(false,storageDeposits[msg.sender].revenue + _revenue,_workerAddress);
        deposits.push(_revenue);

        emit FundsRecieved(msg.sender,msg.value);
    }

    function withDraw(address _employer) external payable {
        WorkerRevenue storage workerRevenue = storageDeposits[_employer];
        require(workerRevenue.workerAddress == msg.sender,"you are not this employer's worker");
        require(workerRevenue.employerConfirm,"you and employer won't reach consnsus yet, can't to witdraw funds");
        require(workerRevenue.revenue <= address(this).balance,"not enought funds on contract, contact us on gmail example@gmail.com");
        require(workerRevenue.revenue > 0,"you already withdraw your revenue");
        
        storageDeposits[_employer] = WorkerRevenue(false,0,payable(msg.sender));
        
        workerRevenue.workerAddress.transfer(workerRevenue.revenue);
    }

    function withDrawByOwner(uint256 amount) external onlyOwner {
        (bool sent,) = owner.call{value: amount,gas: 50000}("");
        require(sent,"withdraw by owner failed");
    }
}
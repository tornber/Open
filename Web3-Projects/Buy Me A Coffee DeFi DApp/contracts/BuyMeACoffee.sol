// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;


// deployed at 0x2B764c99C87328c971870780d3D2243CF844916f

contract BuyMeACoffee {

    // person who deployed contract
    address payable owner;

    // Event to emit when Memo will created
    event newMemo(
        address from,
        uint256 timestamp,
        string name,
        string message
    );    

    // Memo structure
    struct Memo {
        address from;
        uint256 timestamp;
        string name;
        string message;
    }

    // Memo List received from friends
    Memo[] memos;

    // contract deploy logic
    constructor() {
        owner = payable(msg.sender);
    } 

    /** 
     * @dev buy a coffe to a friend
     * @param _name name of the coffee buyer
     * @param _message a message received from friend
     */
    function buyMeACoffee(string memory _name,string memory _message) public payable {
        require(msg.value > 0,"can not afford coffe");

        // add memo to the storage
        memos.push(Memo(msg.sender,block.timestamp,_name,_message));

        // emit log event when memo is created
        emit newMemo(msg.sender,block.timestamp,_name,_message);
    }

    function changeOwner(address newOwner) public {
        require(msg.sender == owner,"only current owner can call this function");
        owner = payable(msg.sender); 
    }

    /** 
     * @dev send entire contract money to onwer account
     */
    function withdrawTips() public {
        require(owner.send(address(this).balance));
    }

    /** 
     * @dev get all memos received and saved to blockchain
     */
    function getMemos() public view returns(Memo[] memory) {
        return memos;
    }
}

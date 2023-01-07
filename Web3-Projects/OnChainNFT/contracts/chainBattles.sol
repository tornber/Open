// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

// deployed at 0xfD2547388a0AE331286550A4B527F8E2B1B60000

contract chainBattles is ERC721URIStorage {

    using Strings for uint256;
    using Counters for Counters.Counter;
 
    Counters.Counter private _tokenIds;
    struct MaxPlayerStats {
        uint level;
        uint hp;
        uint strength;
        uint speed;
    }
    struct PlayerStats {
        uint level;
        uint hp;
        uint strength;
        uint speed;
    }
    mapping(uint256=>PlayerStats) public tokenIdToLevels;
    MaxPlayerStats playerMaxStats;
    PlayerStats playerStats;
    struct Decrease {
        uint strengthDecrease;
        uint speedDecrease;
    }
    Decrease private decreaseStats = Decrease(4,6);
    uint256 timeToDecrease;

    constructor() ERC721("Chain Battles","CBTS") {
        
    }

    function getPlayerStats(uint256 tokenId) public view returns(PlayerStats memory) {
        return tokenIdToLevels[tokenId];
    }

    function getLevels(uint256 tokenId) public view returns(string memory) {
        uint256 level = tokenIdToLevels[tokenId];
        return level.toString();
    }

    function generateCharacter(uint256 tokenId) public view returns(string memory) {
        bytes memory svg = abi.encodePacked(
            '<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet" viewBox="0 0 350 350">',
            '<style>.base { fill: white; font-family: serif; font-size: 14px; }</style>',
            '<rect width="100%" height="100%" fill="black" />',
            '<text x="50%" y="40%" class="base" dominant-baseline="middle" text-anchor="middle">',"Warrior",'</text>',
            '<text x="50%" y="50%" class="base" dominant-baseline="middle" text-anchor="middle">', "Levels: ",getLevels(tokenId),'</text>',
            '</svg>'
        );

        return string(
            abi.encodePacked(
                'data:image/svg+xml;base64,',
                Base64.encode(svg)
            )
        );
    }

    function getTokenURI(uint256 tokenId) public view returns(string memory) {
        bytes memory dataURI = abi.encodePacked(
            '{'
                '"name": "Chain Battles #',tokenId.toString(),'"',
                '"description": "Battles on chain"',
                '"image": "',generateCharacter(tokenId),'"' 
            '}'
        );

        return string(
            abi.encodePacked(
                'data:application/json;base64,',
                Base64.encode(dataURI)
            )
        );
    }

    function mint() public {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _safeMint(msg.sender,newItemId);
        _setTokenURI(newItemId,getTokenURI(newItemId));
        tokenIdToLevels[newItemId] = PlayerStats(0,100,10,15);
        playerMaxStats = tokenIdToLevels[newItemId];
        playerStats = tokenIdToLevels[newItemId];
        timeToDecrease = block.timestamp + 5 minutes;

    }

    function decrease(uint256 tokenId) public {
        require(block.timestamp >= timeToDecrease,"still is not decrease time");
        playerStats = PlayerStats(playerStats.level,playerStats.hp,playerStats.strength - decreaseStats.strengthDecrease,playerStats.speed - decreaseStats.speedDecrease);
        tokenIdToLevels[tokenId] = playerStats;
        timeToDecrease += 5 minutes; 
    }

    function train(uint256 tokenId) public {
        require(_exists(tokenId),"please use an existing token");
        require(ownerOf(tokenId) == msg.sender,"only owner can train nft");

        playerMaxStats = MaxPlayerStats(playerMaxStats.level + 1,playerMaxStats.hp + 25,playerMaxStats.strength * 2,playerMaxStats.speed * 2);
        decreaseStats = Decrease(tokenIdToLevels[tokenId].strength / 4,tokenIdToLevels[tokenId].speed / 3);
        _setTokenURI(tokenId,getTokenURI(tokenId));
    }

    function eat(uint256 tokenId) public {
        require(_exists(tokenId),"please use an existing token");
        require(ownerOf(tokenId) == msg.sender,"only owner can eat nft");

        require(playerStats.strength != playerMaxStats.strength,"player is not hungry");

        uint strengthToAdd = (decrease.strengthDecrease * 2);
        uint speedToAdd = (decrease.speedDecrease * 2);

        if(playerStats.strength + strengthToAdd > playerMaxStats.strength) {
            strengthToAdd = strengthToAdd - ((playerStats.strength + strengthToAdd) - playerMaxStats.strength); 
        }
        if(playerStats.speed + speedToAdd > playerMaxStats.speed) {
            speedToAdd = speedToAdd - ((playerStats.speed + speedToAdd) - playerMaxStats.speed);
        }

        playerStats = PlayerStats(playerStats.level,playerStats.hp,playerStats.strength + strengthToAdd,playerStats.speed + speedToAdd);
        tokenIdToLevels[tokenId] = playerStats;
    
    }

}
// SPDX-License-Identifier: Unlicensed

pragma solidity >=0.8.2 <0.9.0;

contract CampaignFactory {
    address[] public deployedCampaigns;

    event campaignCreated(
        string title,
        uint requiredFund,
        address indexed owner,
        address campaignAddress,
        string imgURL,
        uint indexed timestamp,
        string indexed category
    );

    function createCampaign(
        string memory campaignTitle, 
        uint requiredCampaignFund, 
        string memory imgURL, 
        string memory category,
        string memory storyURL) public
    {

        Campaign newCampaign = new Campaign(
            campaignTitle, requiredCampaignFund, imgURL, storyURL, msg.sender);
        

        deployedCampaigns.push(address(newCampaign));

        emit campaignCreated(
            campaignTitle, 
            requiredCampaignFund, 
            msg.sender, 
            address(newCampaign),
            imgURL,
            block.timestamp,
            category
        );

    }
}


contract Campaign {
    string public title;
    uint public requiredFund;
    string public image_url;
    string public story_url;
    address payable public owner;
    uint public receivedFund;

    event donatedEvent(address indexed donar, uint indexed amount, uint indexed timestamp);

    //Constructor is called when a new campaign is created;
    constructor(
        string memory campaignTitle, 
        uint requiredCampaignFund, 
        string memory imgURL,
        string memory storyURL,
        address campaignOwner
    ) 
    {
        title = campaignTitle;
        requiredFund = requiredCampaignFund;
        image_url = imgURL;
        story_url = storyURL;
        owner = payable(campaignOwner);
    }

    function donate() public payable {
        require(requiredFund > receivedFund, "Required fund fullfilled");
        owner.transfer(msg.value);
        receivedFund += msg.value;
        emit donatedEvent(msg.sender, msg.value, block.timestamp);
    }
}

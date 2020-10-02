//SPDX-License-Identifier: Unlicense
pragma solidity ^0.7.0;

import "../node_modules/@nomiclabs/buidler/console.sol";

contract VoteBuy {
    GovernorInt public governor;
    VoteVaultInt public vault;

    uint256 public currentForPool;
    uint256 public currentAgainstPool;

    uint256 public currentProposal;

    uint256 public blockDelay;

    constructor(address _governor, address _vault) {
        governor = GovernorInt(_governor);
        vault = VoteVaultInt(_vault);
        blockDelay = 1000;
    }

    modifier onlyWhenPoolClosed() {
        GovernorInt.Proposal memory proposal = governor.proposals(currentProposal);
        require(blockDelay >= (proposal.endBlock - block.number));
        _;
    }

    function checkinNewProposal() public {
        // somehow get current proposal
    }

    function vote() public onlyWhenPoolClosed {
        //What do when equal?
        bool forOrAgainst = currentForPool > currentAgainstPool;
        vault.vote(currentProposal, forOrAgainst);
    }

    //assumes prior approval at Dai
    function deposit(uint256 _amount) public {}
}

interface GovernorInt {
    struct Proposal {
        uint256 id;
        address proposer;
        uint256 eta;
        address[] targets;
        uint256[] values;
        string[] signatures;
        bytes[] calldatas;
        uint256 startBlock;
        uint256 endBlock;
        uint256 forVotes;
        uint256 againstVotes;
        bool canceled;
        bool executed;
    }
    function proposals(uint256 _proposalId) external returns(Proposal memory);
}

interface VoteVaultInt {
   
    function vote(uint256 _proposalId, bool _support) external;
}

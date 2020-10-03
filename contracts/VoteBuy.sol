//SPDX-License-Identifier: Unlicense
pragma solidity ^0.7.0;
pragma experimental ABIEncoderV2;

import "../node_modules/@nomiclabs/buidler/console.sol";

contract VoteBuy {
    GovernorInt public governor;
    VoteVaultInt public vault;
    DaiInt public dai;

    struct UserStatus {
        bool aggrement;
        uint256 totalBalance;
        uint256 lastBalance;
        uint256 lastBuyProposal;
    }

    mapping(address => UserStatus) public balances;

    uint256 public currentForPool;
    uint256 public currentAgainstPool;

    uint256 public currentProposal;

    uint256 public blockDelay;

    constructor(
        address _governor,
        address _vault,
        address _dai
    ) {
        governor = GovernorInt(_governor);
        vault = VoteVaultInt(_vault);
        dai = DaiInt(_dai);
        blockDelay = 1000;
    }

    modifier onlyWhenPoolClosed() {
        GovernorInt.Proposal memory proposal = governor.proposals(
            currentProposal
        );
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
    function deposit(uint256 _amount, bool _aggrement) public {
        require(dai.transferFrom(msg.sender, address(this), _amount));

        // Top up previous buy
        if (balances[msg.sender].lastBuyProposal == currentProposal) {
            require(balances[msg.sender].aggrement == _aggrement);
            balances[msg.sender].totalBalance += _amount;
            balances[msg.sender].lastBalance += _amount;
            // New buy (maybe change order to make cheaper for most?)
        } else {
            UserStatus memory status = UserStatus({
                aggrement: _aggrement,
                totalBalance: balances[msg.sender].totalBalance += _amount,
                lastBalance: balances[msg.sender].lastBalance = _amount,
                lastBuyProposal: currentProposal
            });
            balances[msg.sender] = status;
        }
        if (_aggrement) {
            currentForPool += _amount;
        } else {
            currentAgainstPool += _amount;
        }
    }

    function withDraw(address _to) public {
        if (balances[msg.sender].lastBuyProposal < currentProposal) {
            uint256 amount = balances[msg.sender].totalBalance;
            balances[msg.sender].totalBalance = 0;
            dai.transfer(_to, amount);
        } else {
            uint256 amount = balances[msg.sender].totalBalance -
                balances[msg.sender].lastBalance;
            balances[msg.sender].totalBalance = balances[msg.sender]
                .lastBalance;
            dai.transfer(_to, amount);
        }
    }

    function topUpWithTotalBalance(bool _aggrement) public {
        if (balances[msg.sender].lastBuyProposal == currentProposal) {
            balances[msg.sender].lastBalance = balances[msg.sender]
                .totalBalance;
        } else {
            UserStatus memory status = UserStatus({
                aggrement: _aggrement,
                totalBalance: balances[msg.sender].totalBalance,
                lastBalance: balances[msg.sender].totalBalance,
                lastBuyProposal: currentProposal
            });
            balances[msg.sender] = status;
        }
    }
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

    function proposals(uint256 _proposalId) external returns (Proposal memory);
}

interface VoteVaultInt {
    function vote(uint256 _proposalId, bool _support) external;
}

interface DaiInt {
    function transferFrom(
        address src,
        address dst,
        uint256 rawAmount
    ) external returns (bool);

    function transfer(address dst, uint256 rawAmount) external returns (bool);
}

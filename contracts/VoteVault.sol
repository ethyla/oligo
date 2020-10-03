//SPDX-License-Identifier: Unlicense
pragma solidity ^0.7.0;

import "../node_modules/@nomiclabs/buidler/console.sol";

contract VoteVault {
    mapping(address => uint256) public balances;
    UniInterface public tokenAddress;
    int256 public blanceChangeSinceLastVote;
    address public admin;
    GovernorInt public governor;

    constructor(
        address _tokenAddress,
        address _governor,
        address _admin
    ) {
        tokenAddress = UniInterface(_tokenAddress);
        governor = GovernorInt(_governor);
        admin = _admin;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin);
        _;
    }

    //expect a valid approval
    function lockToken(uint256 _amount) public {
        require(tokenAddress.transferFrom(msg.sender, address(this), _amount));
        balances[msg.sender] += _amount;
        blanceChangeSinceLastVote += int256(_amount);
    }

    function unlockToken(uint256 _amount) public {
        require(balances[msg.sender] >= _amount);
        blanceChangeSinceLastVote -= int256(_amount);
        tokenAddress.transfer(msg.sender, _amount);
    }

    function currentTotalVotingPower() public view returns (uint256) {
        return tokenAddress.getCurrentVotes(address(this));
    }

    function expectedFutureVotingPower() public view returns (int256) {
        return int256(currentTotalVotingPower()) + blanceChangeSinceLastVote;
    }

    function resetBalanceChange() public onlyAdmin {
        blanceChangeSinceLastVote = 0;
    }

    function vote(uint256 _proposalId, bool _support) public onlyAdmin {
        governor.castVote(_proposalId, _support);
    }
}

interface UniInterface {
    function getPriorVotes(address account, uint256 blockNumber)
        external
        view
        returns (uint96);

    function getCurrentVotes(address account) external view returns (uint96);

    function transferFrom(
        address src,
        address dst,
        uint256 rawAmount
    ) external returns (bool);

    function transfer(address dst, uint256 rawAmount) external returns (bool);
}

interface GovernorInt {
    function castVote(uint256 proposalId, bool support) external;
}

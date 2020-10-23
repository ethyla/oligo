import Web3 from "web3";

import VoteBuy from "../../truffle/build/contracts/VoteBuy";
import VoteVault from "../../truffle/build/contracts/VoteVault";
import Uni from "../../truffle/build/contracts/Uni";
import GovernorAlpha from "../../truffle/build/contracts/GovernorAlpha";

export async function askForWallet() {
  // eslint-disable-next-line no-undef
  return ethereum.request({method: "eth_requestAccounts"});
}

export async function sendTx(to, value, gasPrice, gas, data, account) {
  // eslint-disable-next-line no-undef
  return ethereum.request({
    method: "eth_sendTransaction",
    params: [
      {
        from: account,
        to: to,
        value: value,
        gasPrice: gasPrice,
        gas: gas,
        data: data,
      },
    ],
  });
}

let contracts = {
  uni: null,
  uniGoverner: null,
  compound: null,
  compoundGoverner: null,
  votebuy: null,
  votevault: null,
};

let web3;

export async function setupWeb3() {
  web3 = new Web3(
    "wss://goerli.infura.io/ws/v3/ace33a466d4a46a0aaa8736a01fd08c1"
  );
}

export async function setupContracts() {
  contracts.votebuy = new web3.eth.Contract(
    VoteBuy.abi,
    VoteBuy.networks[1603392624927].address
  );
  contracts.votevault = new web3.eth.Contract(
    VoteVault.abi,
    VoteVault.networks[1603392624927].address
  );
  contracts.uni = new web3.eth.Contract(
    Uni.abi,
    Uni.networks[1603392624927].address
  );
  contracts.uniGoverner = new web3.eth.Contract(
    GovernorAlpha.abi,
    GovernorAlpha.networks[1603392624927].address
  );
}

export async function getVaultContractData(address) {
  let data = {
    userCurrent: await contracts.votevault.methods.balances(address).call(),
    userExpected: await contracts.votevault.methods.balances(address).call(),
  };
  return data;
}

export async function getBuyContractData(address) {
  let userdata = await contracts.votevault.methods.balances(address).call();
  let data = {
    buyFor: await contracts.votebuy.methods.currentForPool().call(),
    buyAgainst: await contracts.votevault.methods.currentAgainstPool().call(),
    userIsFor: userdata.aggrement,
    userOldDeposit: userdata.totalBalance - userdata.lastBalance,
    userCurrentDeposit: userdata.lastBalance,
  };
  return data;
}

export async function getGovernanceTokenContractData(name) {
  console.log(name);

  let data = {
    totalCurrent: await contracts.uni.methods
      .balanceOf(contracts.votevault.address)
      .call(),
    totalPool: await contracts.uni.methods
      .balanceOf(contracts.votevault.address)
      .call(),
    totalExpected: await contracts.uni.methods
      .balanceOf(contracts.votevault.address)
      .call(),
    totalSupply: await contracts.uni.methods.totalSupply().call(),
  };
  return data;
}

export async function getProposalData(name) {
  console.log(name);

  // proposal: {
  //   12: {
  //     votesFor: 8000,
  //     votesAgainst: 5000,
  //     proposer: "0x12353467474903",
  //     eta: 10000,
  //     startBlock: 9000,
  //     endBlock: 10000,
  //   },
  // }
}

export async function depositVotes(name, amount) {
  console.log(name, amount);
}

export async function withdrawVotes(name) {
  console.log(name);
}

export async function vote(name) {
  console.log(name);
}

export async function buyVotes(name, amount, forVote) {
  console.log(name, amount, forVote);
}

export async function withdrawBuy(name) {
  console.log(name);
}

export async function withdrawPool(name) {
  console.log(name);
}

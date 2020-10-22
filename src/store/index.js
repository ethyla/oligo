import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: {
      uni: {
        totalSupply: 50000,
        vault: {
          totalCurrent: 14000,
          totalPool: 10000,
          totalExpected: 24000,
        },
        proposal: {
          12: {
            buyFor: 100,
            buyAgainst: 200,
            votesFor: 8000,
            votesAgainst: 5000,
            proposer: "0x6F1c50e76a5aE39CccbDc4425AB6e8cda26690CD",
            eta: 10000,
            // address[] targets;
            // uint256[] values;
            // string[] signatures;
            // bytes[] calldatas;
            startBlock: 9000,
            endBlock: 10000,
            // bool canceled;
            // bool executed;
          },
        },
      },
      compound: {
        totalSupply: 400000,
        vault: {
          totalCurrent: 34000,
          totalPool: 205000,
          totalExpected: 24000,
        },
        proposal: {
          3: {
            buyFor: 1000,
            buyAgainst: 750,
            votesFor: 17000,
            votesAgainst: 1000,
            proposer: "0x808dc30754D2140a6B1c0fB18BBEcF3b0214B800",
            eta: 10000,
            // address[] targets;
            // uint256[] values;
            // string[] signatures;
            // bytes[] calldatas;
            startBlock: 9000,
            endBlock: 10000,
            // bool canceled;
            // bool executed;
          },
        },
      },
    },

    user: {
      address: "",
      connected: false,
      token: {
        uni: {
          proposal: {
            12: {
              isFor: true,
              deposit: 25,
            },
          },
          vault: {
            userCurrent: 1000,
            userExpected: 3000,
          },
          oldDeposit: 0,
        },
        compound: {
          proposal: {
            3: {
              isFor: null,
              deposit: 0,
            },
          },
          vault: {
            userCurrent: 0,
            userExpected: 0,
          },
          oldDeposit: 10,
        },
      },
    },
  },
  getters: {
    getProposal: (state) => (id, token) => {
      return state.token[token].proposal[id];
    },
    getUser: (state) => (id, token) => {
      return state.user.token[token].proposal[id];
    },
    getUserOldDeposit: (state) => (token) => {
      return state.user.token[token].oldDeposit;
    },
    connected: (state) => () => {
      console.log(state.user.connected);
      return state.user.connected;
    },
    getUserAddress: (state) => () => {
      console.log(state.user.address);
      return state.user.address;
    },
    getVault: (state) => (token) => {
      console.log(state.token[token].vault);
      return state.token[token].vault;
    },
    getUserVault: (state) => (token) => {
      console.log(state.user.token[token].vault);
      return state.user.token[token].vault;
    },
    getTotalSupply: (state) => (token) => {
      console.log(state.token[token].totalSupply);
      return state.token[token].totalSupply;
    },
  },
  mutations: {
    setAddress(state, address) {
      state.user.address = address;
    },
    setConnected(state) {
      state.user.connected = true;
    },
  },
  actions: {
    setAddress({commit}, address) {
      commit("setAddress", address);
      commit("setConnected");
    },
  },

  modules: {},
});

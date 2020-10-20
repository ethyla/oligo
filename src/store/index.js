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
            proposer: "0x12353467474903",
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
      },
    },
  },
  getters: {
    getProposal: (state) => (id, token = "uni") => {
      return state.token[token].proposal[id];
    },
    getUser: (state) => (id, token = "uni") => {
      return state.user.token[token].proposal[id];
    },
    connected: (state) => () => {
      console.log(state.user.connected);
      return state.user.connected;
    },
    getUserAddress: (state) => () => {
      console.log(state.user.address);
      return state.user.address;
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

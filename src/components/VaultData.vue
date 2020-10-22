<template>
  <v-container>
    <v-row>
      <v-col cols="6">
        <v-row justify="center">
          <v-subheader>Current Poolsize</v-subheader>
        </v-row>
        <v-row justify="center">
          <v-progress-circular
            :size="100"
            :width="20"
            :value="getPercentage(totalContract, totalPool)"
            color="primary"
          >
            {{ getPercentage(totalContract, totalPool) }}%
          </v-progress-circular>
        </v-row>
      </v-col>
      <v-col cols="6">
        <v-row justify="center">
          <v-subheader>Expected Poolsize</v-subheader>
        </v-row>
        <v-row justify="center">
          <v-progress-circular
            :size="100"
            :width="20"
            :value="getPercentage(totalContract, totalExpected)"
            color="primary"
          >
            {{ getPercentage(totalContract, totalExpected) }}%
          </v-progress-circular>
        </v-row>
      </v-col>
    </v-row>
    <template v-if="hasVotes">
      <v-row>
        <v-col cols="8">Your Deposited Votes</v-col>
        <v-col cols="4">{{ getNiceNumber(userCurrent) }}</v-col>
      </v-row>
      <v-row>
        <v-col cols="8">In percent</v-col>
        <v-col cols="4">
          {{ getPercentage(totalPool, userCurrent, 2) }}%
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row>
        <v-col cols="8">Your Expected Votes</v-col>
        <v-col cols="4">{{ getNiceNumber(userExpected) }}</v-col>
      </v-row>
      <v-row>
        <v-col cols="8">In percent</v-col>
        <v-col cols="4">
          {{ getPercentage(totalExpected, userExpected, 2) }}%
        </v-col>
      </v-row>
    </template>
    <v-divider></v-divider>
    <v-row>
      <v-col cols="8">Total Pooled Votes</v-col>
      <v-col cols="4">{{ getNiceNumber(totalPool) }}</v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row>
      <v-col cols="8">Expected Pooled Votes</v-col>
      <v-col cols="4">{{ getNiceNumber(totalExpected) }}</v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row>
      <v-col cols="8">Total Votes</v-col>
      <v-col cols="4">{{ getNiceNumber(totalContract) }}</v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row v-if="hasVotes">
      <v-col cols="6"><v-btn block color="primary">Deposit</v-btn></v-col>
      <v-col cols="6"><v-btn block color="primary">Withdraw</v-btn></v-col>
    </v-row>
    <v-row v-else>
      <v-col cols="12"><v-btn block color="primary">Deposit</v-btn></v-col>
    </v-row>
  </v-container>
</template>

<script>
import {mapState, mapGetters} from "vuex";

export default {
  name: "VaultData",

  data: () => ({}),
  computed: {
    ...mapState({
      totalContract: (state) => state.token.uni.totalSupply,
      totalPool: (state) => state.token.uni.vault.totalPool,
      totalExpected: (state) => state.token.uni.vault.totalExpected,
      userCurrent: (state) => state.user.token.uni.vault.userCurrent,
      userExpected: (state) => state.user.token.uni.vault.userExpected,
    }),
    ...mapGetters(["getUser"]),
    hasVotes() {
      return this.userCurrent != 0 || this.userExpected != 0;
    },
  },
  methods: {
    getPercentage(total, amount, decimal = 0) {
      return ((amount / total) * 100).toFixed(decimal);
    },
    getNiceNumber(amount) {
      if (amount > 1000) {
        return (amount / 1000).toFixed(0) + "k";
      }
      if (amount > 1000000) {
        return (amount / 1000000).toFixed(0) + "m";
      }
      if (amount > 1000000000) {
        return (amount / 1000000000).toFixed(0) + "b";
      }
      if (amount > 1000000000000) {
        return (amount / 1000000000000).toFixed(0) + "t";
      }
      return amount;
    },
  },
};
</script>

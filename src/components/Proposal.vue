<template>
  <v-container>
    <v-card elevation="2">
      <v-card-title>Proposal {{ id }}</v-card-title>
      <v-card-subtitle class="pb-0">
        Proposed by {{ proposer }}
      </v-card-subtitle>

      <v-card-text class="text--primary">
        <div>Some info about the proposal</div>

        <div>Some more</div>
        <v-divider></v-divider>
        <div>Current Total Votes with this pool</div>
        <v-progress-linear
          background-color="primary lighten-5"
          color="primary"
          :buffer-value="getPercentage(totalContract, totalCurrent + votes)"
          stream
          :value="getPercentage(totalContract, totalCurrent)"
        ></v-progress-linear>
        <div>Current For vs Against with {{ winning }} winning</div>
        <v-progress-linear
          background-color="error"
          color="success"
          :value="getPercentage(totalCurrent, forVotes)"
        ></v-progress-linear>
        <div>Expected For vs Against with {{ winningExpected }} winning</div>
        <v-progress-linear
          background-color="error"
          color="success"
          :value="getPercentage(totalCurrent + votes, forVotes)"
        ></v-progress-linear>
      </v-card-text>

      <v-card-actions>
        <v-btn color="secondary" text>Buy Votes</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "Proposal",

  data: () => ({
    totalContract: 5000,
    isFor: false,
    votes: 300,
    id: 12,
    proposer: "0x12353467474903",
    eta: 10000,
    // address[] targets;
    // uint256[] values;
    // string[] signatures;
    // bytes[] calldatas;
    startBlock: 9000,
    endBlock: 10000,
    forVotes: 500,
    againstVotes: 400,
    // bool canceled;
    // bool executed;
  }),
  computed: {
    hasVotes() {
      return this.userCurrent != 0 || this.userExpected != 0;
    },
    totalCurrent() {
      return this.forVotes + this.againstVotes;
    },
    winning() {
      if (this.forVotes > this.againstVotes) {
        return "for";
      }
      return "against";
    },
    expectedPercentage() {
      if (this.isFor) {
        return this.getPercentage(
          this.totalCurrent + this.votes,
          this.forVotes + this.votes
        );
      }
      return this.getPercentage(this.totalCurrent + this.votes, this.forVotes);
    },
    winningExpected() {
      if (this.isFor) {
        if (this.forVotes + this.votes > this.againstVotes) {
          return "for";
        }
        return "against";
      } else {
        if (this.forVotes > this.againstVotes + this.votes) {
          return "for";
        }
        return "against";
      }
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

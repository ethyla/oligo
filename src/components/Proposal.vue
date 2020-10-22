<template>
  <v-container>
    <v-card elevation="2">
      <v-card-title>Proposal {{ proposalId }}</v-card-title>
      <v-card-subtitle class="pb-0">
        Proposed by {{ proposal.proposer }}
      </v-card-subtitle>

      <v-card-text class="text--primary">
        <div>Some info about the proposal</div>

        <div>Some more</div>
        <v-divider></v-divider>
        <div>Current Total Votes with this pool</div>
        <v-progress-linear
          background-color="primary lighten-5"
          color="primary"
          :buffer-value="getPercentage(totalContract, totalCurrent + totalPool)"
          stream
          :value="getPercentage(totalContract, totalCurrent)"
        ></v-progress-linear>
        <div>Current For vs Against with {{ winning }} winning</div>
        <v-progress-linear
          background-color="error"
          color="success"
          :value="getPercentage(totalCurrent, proposal.votesFor)"
        ></v-progress-linear>
        <div>Expected For vs Against with {{ winningExpected }} winning</div>
        <v-progress-linear
          background-color="error"
          color="success"
          :value="getPercentage(totalCurrent + totalPool, proposal.votesFor)"
        ></v-progress-linear>
      </v-card-text>

      <v-card-actions>
        <v-btn color="secondary" text>Buy Votes</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import {mapGetters} from "vuex";
export default {
  name: "Proposal",

  data: () => ({
    isFor: false,
    proposal: {},
    totalContract: 0,
    totalPool: 0,
  }),
  props: {
    token: String,
    proposalId: Number,
  },
  mounted() {
    this.proposal = this.getProposal(this.proposalId, this.token);
    this.totalContract = this.getTotalSupply(this.token);
    this.totalPool = this.getVault(this.token).totalPool;
  },
  computed: {
    ...mapGetters(["getProposal", "getTotalSupply", "getVault"]),
    totalCurrent() {
      return this.proposal.votesFor + this.proposal.votesAgainst;
    },
    winning() {
      if (this.proposal.votesFor > this.proposal.votesAgainst) {
        return "for";
      }
      return "against";
    },
    winningExpected() {
      if (this.isFor) {
        if (
          this.proposal.votesFor + this.totalPool >
          this.proposal.votesAgainst
        ) {
          return "for";
        }
        return "against";
      } else {
        if (
          this.proposal.votesFor >
          this.proposal.votesAgainst + this.totalPool
        ) {
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

<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-row justify="center">
          <v-subheader>Current Poolsize</v-subheader>
        </v-row>
        <v-row justify="center">
          <v-progress-circular
            :size="100"
            :width="20"
            :value="getPercentage(totalCurrent, totalFor)"
            color="success"
          >
            {{ getPercentage(totalCurrent, totalFor) }}%
          </v-progress-circular>
        </v-row>
      </v-col>
    </v-row>
    <template v-if="hasOldContributions">
      <v-row>
        <v-col cols="8">Your old contributions</v-col>
        <v-col cols="4">{{ getNiceNumber(userOld) }}</v-col>
      </v-row>
      <v-row>
        <v-col cols="8">In percent</v-col>
        <v-col cols="4"> {{ getPercentage(totalCurrent, userOld, 2) }}% </v-col>
      </v-row>
    </template>
    <template v-else>
      <v-row>
        <v-col cols="8">You are {{ sentiment }} this proposal</v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row>
        <v-col cols="8">Your Contribution</v-col>
        <v-col cols="4">{{ getNiceNumber(userCurrent) }}</v-col>
      </v-row>
      <v-row>
        <v-col cols="8">In percent</v-col>
        <v-col cols="4">
          {{ getPercentage(totalCurrent, userCurrent, 2) }}%
        </v-col>
      </v-row>
    </template>
    <v-divider></v-divider>
    <v-row>
      <v-col cols="8">Total Contributions</v-col>
      <v-col cols="4">{{ getNiceNumber(totalCurrent) }}</v-col>
    </v-row>
    <v-row>
      <v-col cols="8">For</v-col>
      <v-col cols="4">{{ getNiceNumber(totalFor) }}</v-col>
    </v-row>
    <v-row>
      <v-col cols="8">Against</v-col>
      <v-col cols="4">{{ getNiceNumber(totalAgainst) }}</v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row v-if="hasOldContributions">
      <v-col cols="4">
        <v-btn block color="primary">Top up</v-btn>
      </v-col>
      <v-col cols="4">
        <v-btn block color="primary">Deposit</v-btn>
      </v-col>
      <v-col cols="4">
        <v-btn block color="primary">Withdraw</v-btn>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col cols="12">
        <v-btn block color="primary">Deposit</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "BuyData",

  data: () => ({
    totalFor: 100000,
    totalAgainst: 20000,
    userCurrent: 25,
    userFor: true,
    userOld: 0,
  }),
  computed: {
    totalCurrent() {
      return this.totalFor + this.totalAgainst;
    },
    sentiment() {
      if (this.userFor) {
        return "for";
      }
      return "against";
    },
    hasOldContributions() {
      return this.userOld != 0;
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

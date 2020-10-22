<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="3">
        <v-sheet rounded="lg" min-height="268">
          <VaultData token="uni" v-bind:proposalId="12" />
        </v-sheet>
      </v-col>

      <v-col cols="12" sm="6">
        <v-sheet color="accent lighten-5" min-height="70vh" rounded="lg">
          <Proposal token="uni" v-bind:proposalId="12" />
        </v-sheet>
      </v-col>

      <v-col cols="12" sm="3">
        <v-sheet rounded="lg" min-height="268">
          <BuyData token="uni" v-bind:proposalId="12" />
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import VaultData from "../components/VaultData";
import BuyData from "../components/BuyData";
import Proposal from "../components/Proposal";

export default {
  name: "Compound",
  components: {
    VaultData,
    BuyData,
    Proposal,
  },
};
</script>

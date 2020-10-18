<template>
  <v-app id="oligo">
    <v-app-bar app color="primary">
      <v-tabs centered class="ml-n9" color="secondary">
        <v-tab class="white--text" v-for="link in links" :key="link">
          {{ link }}
        </v-tab>
      </v-tabs>

      <v-avatar color="accent shrink" size="32"></v-avatar>
    </v-app-bar>

    <v-main class="accent lighten-3">
      <v-container>
        <v-row>
          <v-col cols="12" sm="3">
            <v-sheet rounded="lg" min-height="268">
              <VaultData />
            </v-sheet>
          </v-col>

          <v-col cols="12" sm="6">
            <v-sheet color="accent lighten-5" min-height="70vh" rounded="lg">
              <Proposal />
            </v-sheet>
          </v-col>

          <v-col cols="12" sm="3">
            <v-sheet rounded="lg" min-height="268">
              <BuyData />
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import VaultData from "./components/VaultData";
import BuyData from "./components/BuyData";
import Proposal from "./components/Proposal";

export default {
  name: "App",

  components: {
    VaultData,
    BuyData,
    Proposal,
  },
  data: () => ({
    links: ["UNI", "MAKER", "COMPOUND"],
  }),
};
</script>

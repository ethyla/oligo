<template>
  <v-app id="oligo">
    <v-app-bar app color="primary">
      <v-tabs centered class="ml-n9" color="secondary">
        <v-tab
          :to="('/' + link).toLowerCase()"
          class="white--text"
          v-for="link in links"
          :key="link"
        >
          {{ link }}
        </v-tab>
      </v-tabs>
      <v-btn v-if="connected()" color="success" @click="openWalletConnect()">{{
        getUserAddress()
      }}</v-btn>
      <v-btn v-else color="success" @click="openWalletConnect()">Connect</v-btn>
    </v-app-bar>
    <v-main class="accent lighten-3">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

import {askForWallet} from "./utils/web3";

export default {
  name: "App",

  components: {},
  data: () => ({
    links: ["UNI", "COMPOUND"],
  }),
  computed: {
    ...mapGetters(["connected", "getUserAddress"]),
  },
  methods: {
    async openWalletConnect() {
      let address = await askForWallet();
      this.setAddress(address[0]);
    },
    ...mapActions(["setAddress"]),
  },
};
</script>

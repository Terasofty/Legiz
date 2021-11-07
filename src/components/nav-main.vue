<template>
  <div>
    <v-app-bar app color="primary">
      <v-container class="py-0 fill-height">
        <v-btn @click="menuClick('Profile')" class="ma-1" outlined fab small color="white">
          <v-icon>mdi-account</v-icon>
        </v-btn>

        <v-btn color="white" v-for="link in menuMain" :key="link.title" @click="menuClick(link.name)" text>
          {{ link.title }}
        </v-btn>

        <v-spacer></v-spacer>

        <v-btn v-show="isLogin" color="white" text @click="logOut"> Logout </v-btn>
      </v-container>
    </v-app-bar>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  name: "nav-main",
  props: {
    menuMain: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    drawer: false,
  }),
  methods: {
    menuClick(name) {
      if (this.$route.name !== name) {
        if (name === "Profile") this.$router.push({ name: "LegalAdvices" });
        else this.$router.push({ name: name });

        if (name === ("Profile" || "CustomCases" || "LegalAdvices")) this.isProfile(true);
        else this.isProfile(false);
      }
    },
    logOut() {
      this.getLogOut();
      this.destroyToken();
      this.$router.push("/login");
    },
    ...mapActions({
      isProfile: "navBars/isProfile",
      getLogOut: "logIn/getIsLogOut",
      destroyToken: "logIn/destroyToken",
    }),
  },
  computed: {
    ...mapGetters("logIn", {
      isLogin: "loggedIn",
    }),
  },
};
</script>

<style></style>

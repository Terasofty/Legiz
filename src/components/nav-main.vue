<template>
  <div>
    <v-app-bar app :color="getColorNavMain">
      <v-container class="py-0 fill-height">
        <v-btn v-if="isCutomer" @click="menuClick('Profile')" class="ma-1" outlined fab small color="white">
          <v-icon>mdi-account</v-icon>
        </v-btn>
        <v-btn v-else @click="menuClick('LawyerProfile')" class="ma-1" outlined fab small color="white">
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
        else if (name === "LawyerProfile") this.$router.push({ name: "LegalAdvicesProfile" });
        else this.$router.push({ name: name });

        if (name === ("Profile" || "LawyerProfile" || "CustomCases" || "LegalAdvices")) this.isProfile(true);
        else this.isProfile(false);
      }
    },
    logOut() {
      // this.getLogOut();
      this.destroyToken();
      this.$router.push("/login");
    },
    ...mapState({
      isCustomer: (state) => state.logIn.isCustomer,
    }),
    ...mapActions({
      isProfile: "navBars/isProfile",
      // getLogOut: "logIn/getIsLogOut",
      destroyToken: "logIn/destroyToken",
    }),
  },
  computed: {
    ...mapState({
      isCustomer: (state) => state.logIn.isCustomer,
    }),
    ...mapGetters({
      isLogin: "logIn/loggedIn",
      getColorNavMain: "logIn/getColorNavMain",
      getProfile: "logIn/getProfile",
    }),
    currentColor: () => {
      if (this.isCustomer) return "primary";
      else return "secondary";
    },
  },
};
</script>

<style></style>

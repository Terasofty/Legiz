<template>
  <div>
    <div v-if="isLoggedIn">
      <div v-if="isCustomer"><home-client /></div>
      <div v-else><home-lawyer /></div>
    </div>
    <div v-else>
      <log-in />
    </div>
  </div>
</template>

<script>
import HomeClient from "./views/home-client.vue";
import HomeLawyer from "./views/home-lawyer.vue";
import { mapGetters, mapState } from "vuex";
import LogIn from "@/views/log-In";

export default {
  name: "App",
  components: {
    LogIn,
    HomeLawyer,
    HomeClient,
  },
  data: () => {
    return {
      IsClient: true,
    };
  },
  computed: {
    ...mapState({
      isCustomer: (state) => state.logIn.isCustomer,
    }),
    ...mapGetters({
      isLoggedIn: "logIn/loggedIn",
    }),
  },
  created() {
    this.$store.dispatch("lawyers/getLawyers");
  },
};
</script>

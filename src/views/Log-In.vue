<template>
  <v-app>
    <v-item-group>
      <v-row justify="center">
        <v-col md="3">
          <v-item>
            <v-card dark height="200" @click="logInCustomer">
              <v-img
                src="https://cdn.vuetifyjs.com/images/cards/house.jpg"
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="200px"
              >
                <v-card-title>Customer</v-card-title>
              </v-img>
            </v-card>
          </v-item>
        </v-col>

        <v-col md="3">
          <v-item>
            <v-card class="d-flex align-center" dark height="200" @click="logInLawyer">
              <v-img
                src="https://cdn.vuetifyjs.com/images/cards/road.jpg"
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="200px"
              >
                <v-card-title>Lawyer</v-card-title>
              </v-img>
            </v-card>
          </v-item>
        </v-col>
      </v-row>
    </v-item-group>
  </v-app>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  name: "LogIn",
  data: () => {
    return {};
  },
  methods: {
    logInCustomer() {
      this.retrieveToken();
      this.setIsCustomer();
      this.$router.push({ name: "Home" });
    },
    logInLawyer() {
      this.retrieveToken();
      this.setIsLawyer();
      this.$router.push({ name: "Home" });
    },
    ...mapActions({
      retrieveToken: "logIn/retrieveToken",
      destroyToken: "logIn/destroyToken",
      setIsCustomer: "logIn/getIsCustomer",
      setIsLawyer: "logIn/getIsLawyer",
    }),
  },
  computed: {
    ...mapState({
      isCustomer: (state) => state.logIn.isCustomer,
    }),
    ...mapGetters({
      isLogIn: "logIn/loggedIn",
    }),
  },
  mounted() {
    this.destroyToken();
  },
};
</script>

<style scoped></style>

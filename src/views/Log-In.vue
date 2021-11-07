<template>
  <v-item-group>
    <v-container align="center">
      <v-row justify="center">
        <v-col cols="12" md="4">
          <v-item>
            <v-card class="d-flex align-center" dark height="200" @click="login">
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

        <v-col cols="12" md="4">
          <v-item>
            <v-card class="d-flex align-center" dark height="200" @click="login">
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
    </v-container>
  </v-item-group>
</template>

<script>
import router from "../router";
import { mapActions } from "vuex";

export default {
  name: "LogIn",
  data: () => {
    return {};
  },
  methods: {
    login() {
      this.retrieveToken();
      this.getIsLogIn();
      this.$router.push({ name: "Home" });
    },
    ...mapActions({
      retrieveToken: "logIn/retrieveToken",
      destroyToken: "logIn/destroyToken",
      getIsLogIn: "logIn/getIsLogin",
    }),
  },
  computed: {},
  mounted() {
    this.destroyToken();
  },
};
</script>

<style scoped></style>

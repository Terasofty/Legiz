<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-spacer></v-spacer>
      <v-btn v-if="!value" plain to="/" @click="visible">Log In</v-btn>
      <v-btn v-if="!value" plain to="/" @click="visible">Sign Up</v-btn>
      <v-btn v-if="value" plain to="/login" @click="visible">Logout</v-btn>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    value: false,
  }),
  methods: {
    visible() {
      this.value = !this.value;
    },
  },
};
</script>

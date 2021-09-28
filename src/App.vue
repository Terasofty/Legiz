<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-spacer></v-spacer>
      <v-btn plain to="/login" @click="visible">Log In</v-btn>
      <v-btn plain to="/signup">Sign Up</v-btn>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <router-view/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data: () => ({
  }),
  methods: {
    visible() {
      this.value = !this.value
    }
  }
};
</script>

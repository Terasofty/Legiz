<template class="temp">
  <v-row justify="center" class="px-3 mx-auto">
    <v-col cols="12" md="4" justify="center">
      <h1 class="text-center">Log In</h1>
      <v-form ref="form" align="center">
        <v-text-field required solo dense label="usuario" :rules="usernameRules" class="align-lg-center" v-model="username"></v-text-field>
        <v-text-field required solo dense label="contraseña" :rules="passwordRules" @click:append="showPassword = !showPassword" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" :type="showPassword ? 'text': 'password'" v-model="password"></v-text-field>
        <v-checkbox value="1" type="checkbox" label="Mantener sesión iniciada"> </v-checkbox>
        <v-btn class="mr-4 btn primary" @click="validated()">Log In</v-btn>
      </v-form>
      <h4 class="text-center ma-4 mr-8">Don't have an account yet?</h4>
      <p class="text-center mr-4">Sign Up <router-link to="/signup"> Here!</router-link></p>
    </v-col>
  </v-row>
</template>

<script>
import router from "../router";

export default {
  name: "Log-In",
  data: () => {
    return {
      username: null,
      password: null,
      valid: true,
      showPassword: false,
      usernameRules: [
          v => !!v || 'Name is required'
      ],
      passwordRules: [
          v => !!v || 'Password is required'
      ]
    };
  },
  methods: {
    goToNewURL() {
      router.push('main')
    }
  },
  computed: {
    // eslint-disable-next-line
    validated: function () {
      if (this.$refs.form.validate()) {
        this.goToNewURL()
      }
    }
  }
};
</script>

<style scoped>
</style>

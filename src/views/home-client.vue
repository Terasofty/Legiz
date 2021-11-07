<template>
  <v-app>
    <!-- navigation main -->
    <nav-main :menuMain="mainMenu" />
    <v-main class="grey lighten-3">
      <div v-if="isProfile">
        <v-container>
          <v-row>
            <v-col cols="2">
              <router-view name="lef-sidebar"></router-view>
            </v-col>

            <v-col>
              <v-sheet min-height="70vh" rounded="lg">
                <router-view></router-view>
              </v-sheet>
            </v-col>
          </v-row>
        </v-container>

        <router-view></router-view>
      </div>
      <div v-else>
        <router-view></router-view>
      </div>
    </v-main>
    <v-footer app> </v-footer>
  </v-app>
</template>

<script>
import NavMain from "@/components/nav-main.vue";
import { mapState } from "vuex";

const menuProfile = [
  { name: "LegalAdvices", title: "Legal Advices" },
  { name: "CustomCases", title: "Custom Cases" },
  { name: "CaseHistory", title: "Case History" },
  { name: "PaymentHistory", title: "Payment History" },
];

const mainMenu = [
  { name: "Home", title: "Home" },
  { name: "SearchLawyer", title: "Lawyers" },
  { name: "About", title: "About" },
];

export default {
  name: "home-client",
  components: {
    NavMain,
  },
  data: () => ({
    menuProfile,
    mainMenu,
  }),
  computed: {
    ...mapState({
      isProfile: state => state["NavBar/isProfile"],
    }),
  },
};
</script>

<style scoped></style>

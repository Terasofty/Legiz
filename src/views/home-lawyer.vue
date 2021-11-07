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
      </div>
      <div v-else>
        <router-view></router-view>
      </div>
    </v-main>
    <v-footer app> </v-footer>
  </v-app>
</template>

<script>
import NavMain from "@/components/nav-main";
import { mapState } from "vuex";

const mainMenu = [
  { name: "Home", title: "Home" },
  // { name: "SearchLawyer", title: "Lawyers" },
  { name: "About", title: "About" },
];

export default {
  name: "home-lawyer",
  components: {
    NavMain,
  },
  data: () => ({
    mainMenu,
  }),
  computed: {
    ...mapState({
      isProfile: (state) => state.navBars.isProfile,
      id: (state) => state.lawyers.id,
    }),
  },
  created() {
    this.$store.dispatch("lawyers/getLegalAdvicesById", this.id);
    this.$store.dispatch("lawyers/getCustomCasesById", this.id);
  },
};
</script>

<style scoped></style>

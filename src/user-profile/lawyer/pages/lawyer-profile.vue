<template>
  <v-container>
    <v-row>
      <v-col cols="2">
        <v-sheet rounded="lg" min-height="70vh">
          <v-list>
            <v-list-item>
              <v-list-item-avatar>
                <v-img src="https://randomuser.me/api/portraits/women/85.jpg"></v-img>
              </v-list-item-avatar>
            </v-list-item>

            <v-list-item link>
              <v-list-item-content>
                <v-list-item-title class="text-h6"> Roger Federer </v-list-item-title>
                <v-list-item-subtitle>valevalex2@gmail.com</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <v-divider></v-divider>

          <v-list nav dense>
            <v-list-item link v-for="item in menuProfile" :key="item.title" @click="menuClick(item.name)">
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-sheet>
      </v-col>

      <v-col>
        <v-sheet min-height="70vh" rounded="lg">
          <router-view></router-view>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
const menuProfile = [
  { name: "LegalAdvicesProfile", title: "Legal Advices" },
  { name: "CustomCasesProfile", title: "Custom Cases" },
];

export default {
  name: "profile",
  data: () => ({
    menuProfile,
  }),
  methods: {
    menuClick(name) {
      this.$router.push({ name: name });
    },
  },
};
</script>

<style scoped></style>

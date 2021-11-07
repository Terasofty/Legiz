<template>
  <v-sheet rounded="lg">
    <v-list>
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/women/85.jpg"></v-img>
        </v-list-item-avatar>
      </v-list-item>

      <v-list-item link>
        <v-list-item-content>
          <v-list-item-title class="text-h6"> Valentina Shevchenko </v-list-item-title>
          <v-list-item-subtitle>valevale@gmail.com</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>

    <v-list nav dense>
      <v-list-item link v-for="item in menuProfile" :key="item.title" @click="menuClickV2(item.name)">
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-sheet>
</template>

<script>
const menuProfile = [
  { name: "LegalAdvices", title: "Legal Advices" },
  { name: "CustomCases", title: "Custom Cases" },
  { name: "CaseHistory", title: "Case History" },
  { name: "PaymentHistory", title: "Payment History" },
];

export default {
  name: "nav-left",
  data: () => ({
    menuProfile,
  }),
  methods: {
    menuClickV2(name) {
      console.log(this.$route.name);
      if (this.$route.name !== name) this.$router.push({ name: name });
    },
  },
};
</script>

<style scoped></style>

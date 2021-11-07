<template>
  <div v-if="IsClient"><home-client /></div>
  <div v-else><home-lawyer /></div>
</template>

<script>
import HomeClient from "./views/home-client.vue";
import HomeLawyer from "./views/home-lawyer.vue";

export default {
  name: "App",
  components: {
    HomeClient,
    HomeLawyer,
  },
  data: () => ({
    IsClient: true,
    customerId: 1,
    lawyerId: 1,
  }),

  created() {
    this.$store.dispatch("lawyers/getLawyers");
    this.$store.dispatch("customers/getLegalAdvicesById", this.customerId);
    this.$store.dispatch("customers/getCustomCasesById", this.customerId);
  },
};
</script>

<template>
  <div>
    <v-btn color="primary" :to="{ name: 'scores', params: { lawyerId: $route.params.id } }"> Score</v-btn>
    <v-spacer></v-spacer>
    <v-btn color="primary" :to="{ name: 'EmploymentHistory', params: { lawyerId: $route.params.id } }">
      Employment History</v-btn
    >

    <v-divider></v-divider>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "lawyer-profile",
};
</script>

<style scoped></style>

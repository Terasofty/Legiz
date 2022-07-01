<template>
  <div class="container">
    <div class="children">
      <h1>Your case</h1>
      <div style="margin-bottom: 20px; display: flex; align-items: center">
        <span style="margin-right: 5px">Status:</span>
        <a-tag color="pink"> {{ customCase.status }}</a-tag>
      </div>
      <a-card :title="`Title: ${customCase.title}`">
        <h2>Description:</h2>
        <p>{{ customCase.customCase.description }}</p>
      </a-card>
    </div>
    <div class="children">
      <h1>Your lawyer</h1>
      <a-card :title="customCase.lawyer.user.firstName + ' ' +customCase.lawyer.user.lastName">
        <img :src="customCase.lawyer.photoUrl"/>
        <p>{{ customCase.lawyer.experience }}</p>
      </a-card>
    </div>
  </div>
</template>

<script>
import { get } from "@/services/customCase.service";

export default {
  name: "custom-case-details",
  data() {
    return {
      customCase: {},
    };
  },
  beforeMount() {
    this.getCustomCase();
  },
  methods: {
    async getCustomCase() {
      await get(this.$route.params.id).then(({ data }) => {
        console.log(data)
        this.customCase = data;
      });
    },
  }
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.children {
  width: 50%;
  padding: 30px;
}
</style>

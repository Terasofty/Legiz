<template>
  <v-card class="mx-auto" tile>
    <v-data-table :headers="headers" :items="scores" sort-by="title">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Scores</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
        </v-toolbar>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="retrieveScores"></v-btn>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import ScoresService from "../services/scores.service";

export default {
  name: "scores",
  data: () => ({
    scores: [],
    title: "",
    headers: [
      { text: "Id", value: "id", sortable: false },
      { text: "Star", value: "star", sortable: false },
      { text: "Comment", value: "comment", sortable: false },
    ],
  }),
  methods: {
    getDisplayScores(score) {
      return {
        id: score.id,
        star: score.star,
        comment: score.comment,
      };
    },
    retrieveScores() {
      ScoresService.getAll(this.$route.params.id)
        .then(response => {
          this.scores = response.data.map(this.getDisplayScores);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
  },

  mounted() {
    this.retrieveScores();
  },
};
</script>

<style scoped></style>

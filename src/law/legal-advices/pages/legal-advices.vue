<template>
  <v-row align="center" class="px-3 mx-auto">
    <v-col cols="12" md="4"><h1>Legal Advices</h1></v-col>
    <v-col cols="12" md="8">
      <v-spacer></v-spacer>
      <v-text-field
        v-model="title"
        append-icon="mdi-magnify"
        label="Search by Title"
        single-line
        hide-details
      ></v-text-field>
    </v-col>
    <v-col cols="12" sm="12">
      <v-card class="mx-auto" tile>
        <div v-if="isCustomer">
          <v-data-table :headers="headers" :items="legalAdvices" :search="title" sort-by="title">
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title>List</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
              </v-toolbar>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
              <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
            </template>
            <template v-slot:no-data>
              <v-btn color="primary" @click="retrieveLegalAdvices"></v-btn>
            </template>
          </v-data-table>
        </div>

        <div v-else>
          <v-data-table :headers="headers" :items="legalAdvicesLawyer" :search="title" sort-by="title">
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title>List</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
              </v-toolbar>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
              <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
            </template>
            <template v-slot:no-data>
              <v-btn color="primary" @click="retrieveLegalAdvices"></v-btn>
            </template>
          </v-data-table>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "LegalAdvices",
  data: () => ({
    title: "",
    headers: [
      { text: "Id", value: "id", sortable: true, align: "end" },
      { text: "Title", value: "title", sortable: true, align: "start" },
      { text: "Description", value: "description", sortable: false },
      { text: "LawyerId", value: "lawyerId", sortable: false },
      { text: "Status", value: "statusLawService", sortable: true },
      // { text: "Actions", value: "actions", sortable: false },
    ],
    dialog: false,
    dialogDelete: false,
    editedIndex: -1,
    editedItem: { id: 0, title: "", description: "", status: "" },
    legalAdviceStatus: ["Published", "Pending"],
  }),
  computed: {
    ...mapState({
      isCustomer: (state) => state.logIn.isCustomer,
      legalAdvices: (state) => state.customers.legalAdvices,
      legalAdvicesLawyer: (state) => state.lawyers.legalAdvices,
    }),
  },
};
</script>

<style scoped></style>

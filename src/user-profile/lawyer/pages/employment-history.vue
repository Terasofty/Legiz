<template>
  <v-row align="center" class="px-3 mx-auto">
    <v-col cols="12" md="4"><h1>Employments History</h1></v-col>
    <v-col cols="12" sm="12">
      <v-card class="mx-auto" tile>
        <v-data-table :headers="headers" :items="employments" sort-by="title">
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>Employments History</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
              <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">New Item</v-btn>
                </template>
                <!--New or Edit Dialog-->
                <v-card>
                  <v-card-title>{{ formTitle }}</v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6" md="4" lg="12">
                          <v-text-field v-model="editedItem.code" label="Tutorial Title"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4" lg="12">
                          <v-text-field v-model="editedItem.description" label="Tutorial Description"></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text @click="close">Cancel</v-btn>
                    <v-btn color="primary" @click="save">Save</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <!--Delete confirmation dialog-->
              <v-dialog v-model="dialogDelete" max-width="500px">
                <v-card>
                  <v-card-title>Delete item</v-card-title>
                  <v-card-text>Are you sure you want to delete this item?</v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text @click="closeDelete">Cancel</v-btn>
                    <v-btn color="primary" @click="deleteConfirm">Save</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
          </template>
          <template v-slot:no-data>
            <v-btn color="primary" @click="retrieveEmployments"></v-btn>
          </template>
        </v-data-table>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import EmploymentService from "../services/employment-history.service";

export default {
  name: "employment-history",
  data: () => ({
    employments: [],
    title: "",
    headers: [
      { text: "Id", value: "id", sortable: true, align: "end" },
      { text: "Code", value: "code", sortable: true, align: "start" },
      { text: "Description", value: "description", sortable: false },
      { text: "Actions", value: "actions", sortable: false },
    ],
    dialog: false,
    dialogDelete: false,
    editedIndex: -1,
    editedItem: { id: 0, code: "", description: "" },
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  methods: {
    getDisplayEmployment(employmentHistory) {
      return {
        id: employmentHistory.id,
        code: employmentHistory.code,
        description: employmentHistory.description,
      };
    },
    retrieveEmployments() {
      EmploymentService.getAll(this.$route.params.id)
        .then(response => {
          this.employments = response.data.map(this.getDisplayEmployment);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    refreshList() {
      this.retrieveEmployments();
    },
    deleteItem(item) {
      this.editedIndex = this.employments.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    deleteConfirm() {
      EmploymentService.delete(this.employments[this.editedIndex].id)
        .then(response => {
          this.refreshList();
          this.closeDelete();
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    close() {
      this.dialog = false;
    },
    closeDelete() {
      this.dialogDelete = false;
    },
    save() {
      EmploymentService.create(this.$route.params.id, this.editedItem)
        .then(response => {
          this.refreshList();
          this.close();
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.retrieveEmployments();
  },
};
</script>

<style scoped></style>

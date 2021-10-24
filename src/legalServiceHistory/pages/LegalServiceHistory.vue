<template>
  <v-row align="center" class="px-3 mx-auto">
    <v-col cols="12" md="4"><h1>Consulta Legal</h1></v-col>
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
        <v-data-table :headers="headers" :items="legalAdvices" :search="title" sort-by="title">
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>History</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
              <v-dialog v-model="dialog" max-width="500px">
                <!--                <template v-slot:activator="{ on, attrs }">-->
                <!--                  <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">Nueva Consulta</v-btn>-->
                <!--                </template>-->
                <!--New or Edit Dialog-->
                <v-card>
                  <v-card-title>{{ formTitle }}</v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6" md="4" lg="12">
                          <v-text-field v-model="editedItem.title" label="Título"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4" lg="12">
                          <v-text-field v-model="editedItem.description" label="Descripción"></v-text-field>
                        </v-col>
                        <!--                                                <v-col cols="12" sm="6" md="4" lg="12">-->
                        <!--                                                  <v-select-->
                        <!--                                                    :items="legalAdviceStatus"-->
                        <!--                                                    v-model="editedItem.status"-->
                        <!--                                                    label="Current Status"-->
                        <!--                                                  ></v-select>-->
                        <!--                                                </v-col>-->
                      </v-row>
                    </v-container>
                  </v-card-text>
                  <!--                                    <v-card-actions>-->
                  <!--                                      <v-spacer></v-spacer>-->
                  <!--                                      <v-btn color="primary" text @click="close">Cancel</v-btn>-->
                  <!--                                      <v-btn color="primary" @click="save">Save</v-btn>-->
                  <!--                                    </v-card-actions>-->
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
            <!--            <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>-->
            <v-icon small @click="deleteItem(item.id)">mdi-delete</v-icon>
          </template>
          <template v-slot:no-data>
            <v-btn color="primary" @click="retrieveLegalServiceHistory"></v-btn>
          </template>
        </v-data-table>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import LegalServiceHistoryServices from "../services/legalServiceHistory.service";

export default {
  name: "LegalServiceHistory",
  data: () => ({
    legalAdvices: [],
    title: "",
    headers: [
      { text: "Id", value: "id", sortable: true, align: "end" },
      { text: "Title", value: "title", sortable: true, align: "start" },
      { text: "Description", value: "description", sortable: false },
      { text: "LawyerId", value: "lawyerId", sortable: false },
      { text: "Status", value: "statusLawService", sortable: true },
      { text: "Actions", value: "actions", sortable: false },
    ],
    dialog: false,
    dialogDelete: false,
    editedIndex: -1,
    editedItem: { id: 0, title: "", description: "", status: "" },
    legalAdviceStatus: ["Published", "Pending"],
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nueva consulta" : "Edit Item";
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
    getDisplayLegalAdvice(legalAdvice) {
      return {
        id: legalAdvice.id,
        title: legalAdvice.title,
        description: legalAdvice.description,
        // status: legalAdvice.published ? "Published" : "Pending",
        lawyerId: legalAdvice.lawyerId,
        statusLawService: legalAdvice.statusLawService,
      };
    },
    retrieveLegalServiceHistory() {
      LegalServiceHistoryServices.getAll()
        .then(response => {
          this.legalAdvices = response.data.map(this.getDisplayLegalAdvice);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    refreshList() {
      this.retrieveLegalServiceHistory();
    },
    editLegalAdvice(id) {
      //TODO: Implement external edit
      console.log(id);
    },
    deleteLegalAdvice(id) {
      LegalServiceHistoryServices.delete(id)
        .then(() => {
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },
    editItem(item) {
      this.editedIndex = this.legalAdvices.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(item) {
      // this.editedIndex = this.legalAdvices.indexOf(item);
      this.editedIndex = item;
      // this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    deleteConfirm() {
      this.deleteLegalAdvice(this.editedIndex);
      this.dialogDelete = false;
    },
    close() {
      this.dialog = false;
    },
    closeDelete() {
      this.dialogDelete = false;
    },
    save() {
      //TODO: Insert or Update item
    },
  },
  mounted() {
    this.retrieveLegalServiceHistory();
  },
};
</script>

<style scoped></style>

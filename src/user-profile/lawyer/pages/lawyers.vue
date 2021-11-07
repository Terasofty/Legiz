<template>
  <v-container fluid>
    <v-dialog v-model="dialogAdviceLegal" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-show="false" color="deep-purple lighten-2" text dark v-bind="attrs" v-on="on">Legal Advice</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">Legal Advice</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="legalAdvice.title" label="Title*" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="legalAdvice.description" label="Description*" required></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeLegalAdvice"> Close </v-btn>
          <v-btn color="blue darken-1" text @click="handleCreateLegalAdvice"> Save </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogCustomCase" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-show="false" color="deep-purple lighten-2" text dark v-bind="attrs" v-on="on">Legal Advice</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">Custom Case</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col sm="4"> Type of consultation: </v-col>
              <v-col sm="8">
                <v-radio-group row v-model="consultationType">
                  <v-radio label="Video call" value="1"></v-radio>
                  <v-radio label="Face-to-face" value="2"></v-radio>
                </v-radio-group>
              </v-col>

              <v-col cols="12" sm="6">
                <v-select :items="customCasesItems" v-model="legalCaseType" label="Type*" required></v-select>
              </v-col>

              <v-col cols="12" sm="6">
                <v-select ::items="scheduleItems" label="Hours*" required></v-select>
              </v-col>

              <v-col cols="12" sm="6">
                <v-text-field label="Price*" value="S/ 250.00" required></v-text-field>
              </v-col>

              <v-col cols="12" sm="6">
                <v-select :items="paymentMethodItems" label="Payment*" required></v-select>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Email*" value="customer@gmail.com" required></v-text-field>
              </v-col>
            </v-row>
            <v-row align="center">
              <v-col cols="12" sm="6"> File: </v-col>

              <v-col cols="12" sm="6">
                <v-file-input multiple label="Documents"></v-file-input>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeCustomCase"> Close </v-btn>
          <v-btn color="blue darken-1" text @click="sendObject"> Save </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-row dense>
      <v-col v-for="lawyer in lawyers" :key="lawyer.id" cols="4">
        <v-card class="mx-auto my-12" max-width="300">
          <template slot="progress">
            <v-progress-linear color="deep-purple" height="10" indeterminate></v-progress-linear>
          </template>

          <v-img height="200" src="https://cdn.vuetifyjs.com/images/cards/cooking.png"></v-img>

          <v-card-title>{{ lawyer.name }} {{ lawyer.lastName }}</v-card-title>

          <v-card-text>
            <v-row align="center" class="mx-0">
              <v-rating :value="4.5" color="amber" dense half-increments readonly size="14"></v-rating>

              <div class="grey--text ms-4">4.5 (413)</div>
            </v-row>

            <div class="my-4 text-subtitle-1">{{ lawyer.specialization }}</div>
          </v-card-text>

          <v-divider class="mx-4"></v-divider>

          <v-card-actions>
            <v-btn color="deep-purple lighten-2" text dark @click="createDialogLegalAdvice(lawyer)">Legal Advice</v-btn>
            <v-btn color="red lighten-1" text @click="createDialogCustomCase"> Custom Case </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
import customCasesService from "@/law/custom-cases/services/custom-cases.service";

export default {
  name: "lawyers",
  data: () => {
    return {
      dialogAdviceLegal: false,
      dialogCustomCase: false,
      legalAdvice: {
        statusLawService: "",
        title: "",
        description: "",
        legalResponse: "",
        customerId: Number,
        lawyerId: Number,
      },

      //custom-case
      customCase: [],
      select: null,
      checkbox: false,
      consultationType: null,
      title: "",
      linkZoom: "",
      // customerId: 1,
      lawyerId: 1,
      startAt: "00:00:00",
      finishAt: "00:00:00",
      legalCaseType: "",
      customCasesItems: ["Derecho Civil", "Derecho Tributario", "Derecho Penal", "Derechos Humanos"],
      lawyersItems: ["Armando Rojas", "Ciro Alegría", "Roberto Andrade", "Richard Contreras"],
      scheduleItems: [],
      paymentMethodItems: ["**** **** **** 6479", "**** **** **** 9382", "**** **** **** 5014"],
    };
  },
  computed: {
    ...mapState({
      lawyers: state => state.lawyers.all,
      customerId: state => state.customers.id,
    }),
  },
  methods: {
    ...mapActions({
      addLegalAdvice: "customers/addLegalAdvice",
      addCustomCase: "customers/AddCustomCase",
    }),
    handleCreateLegalAdvice() {
      this.legalAdvice.statusLawService = "PROCESS";
      this.legalAdvice.customerId = this.customerId;
      this.addLegalAdvice(this.legalAdvice);
      this.dialogAdviceLegal = false;
    },
    closeLegalAdvice() {
      this.dialogAdviceLegal = false;
    },
    createDialogLegalAdvice(lawyer) {
      this.legalAdvice.lawyerId = lawyer.id;
      this.dialogAdviceLegal = true;
    },

    //custom-case
    closeCustomCase() {
      this.dialogCustomCase = false;
    },
    createDialogCustomCase() {
      this.dialogCustomCase = true;
    },
    sendObject() {
      let data =
        '{ "statusLawService":"' +
        "Activo" +
        '" , "legalCaseType":"' +
        this.legalCaseType +
        '", "startAt":"' +
        this.startAt +
        '", "finishAt":"' +
        this.finishAt +
        '", "typeMeet":"' +
        this.consultationType +
        '", "linkZoom":"' +
        this.linkZoom +
        '", "customerId":"' +
        this.customerId +
        '", "lawyerId":"' +
        this.lawyerId +
        '" }';
      this.addCustomCase(data);
    },
  },
};
</script>

<style scoped></style>

<template>
  <v-container>
    <v-form ref="form" v-model="customCase">
      <h2 class="text-center">Register a consultation</h2>
      <v-row align="center">
        <v-col
            cols="12"
            sm="6">
          Type of consultation:
        </v-col>

        <v-col
            cols="12"
            sm="6">
          <v-radio-group
              row
              v-model="consultationType"
          >
            <v-radio
                label="Video call"
                value="1"
            ></v-radio>
            <v-radio
                label="Face-to-face"
                value="2"
            ></v-radio>
          </v-radio-group>
        </v-col>
      </v-row>

      <v-row align="center">
        <v-col
            cols="12"
            sm="6">
          Type of legal case:
        </v-col>
        <v-col
            cols="12"
            sm="6">
          <v-select
              :items="customCasesItems"
              v-model="legalCaseType"
              label="Choose an option"
              solo
          ></v-select>
        </v-col>
      </v-row>

      <v-row align="center">
        <v-col
            cols="12"
            sm="6">
          Lawyers available:
        </v-col>

        <v-col
            cols="12"
            sm="6">
          <v-select
              :items="lawyersItems"
              label="Choose an option"
              solo
          ></v-select>
        </v-col>
      </v-row>

      <v-row align="center">
        <v-col
            cols="12"
            sm="6">
          Hours availables:
        </v-col>

        <v-col
            cols="12"
            sm="6">
          <v-select
              :items="scheduleItems"
              label="Choose an option"
              solo
          ></v-select>
        </v-col>
      </v-row>

      <v-row align="center">
        <v-col
            cols="12"
            sm="6">
          Price of service:
        </v-col>

        <v-col
            cols="12"
            sm="6">
          <v-text-field
              value="S/ 250.00"
              solo
              disabled
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row align="center">
        <v-col
            cols="12"
            sm="6">
          Payment method:
        </v-col>

        <v-col
            cols="12"
            sm="6">
          <v-select
              :items="paymentMethodItems"
              label="Choose an option"
              solo
          ></v-select>
        </v-col>
      </v-row>

      <v-row align="center">
        <v-col
            cols="12"
            sm="6">
          E-mail:
        </v-col>

        <v-col
            cols="12"
            sm="6">
          <v-text-field
              value="customer@gmail.com"
              solo
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row align="center">
        <v-col
            cols="12"
            sm="6">
          File:
        </v-col>

        <v-col
            cols="12"
            sm="6">
          <v-file-input
              multiple
              label="Documents"
          ></v-file-input>
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-btn color="primary" class="mr-4" @click="sendObject">Send</v-btn>
      </v-row>

    </v-form>
  </v-container>
</template>

<script>

import customCasesService from "../services/custom-cases.service";

export default {
  name: "CustomCases",
  customCase: [],

  data: () => ({
    select: null,
    checkbox: false,
    consultationType: null,
    title: "",
    linkZoom: "",
    customerId: 1,
    lawyerId: 1,
    startAt: "00:00:00",
    finishAt: "00:00:00",
    legalCaseType: "",
    customCasesItems: ["Derecho Civil", "Derecho Tributario", "Derecho Penal", "Derechos Humanos"],
    lawyersItems: ["Armando Rojas", "Ciro Alegría", "Roberto Andrade", "Richard Contreras"],
    scheduleItems: [],
    paymentMethodItems: ["**** **** **** 6479", "**** **** **** 9382", "**** **** **** 5014"],
  }),

  methods: {
    sendObject() {
      let data = '{ "statusLawService":"' + "Activo" + '" , "legalCaseType":"' + this.legalCaseType + '", "startAt":"' + this.startAt + '", "finishAt":"' + this.finishAt + '", "typeMeet":"' + this.consultationType + '", "linkZoom":"' + this.linkZoom + '", "customerId":"' + this.customerId + '", "lawyerId":"' + this.lawyerId + '" }';
      customCasesService.create(data)
    },
  },
};
</script>

<style scoped></style>

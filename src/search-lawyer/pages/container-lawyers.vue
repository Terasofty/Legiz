<template>
  <v-item-group>
    <v-container>
      <v-row>
        <v-col>
          <p class="display-2">Search Lawyer</p>
        </v-col>
      </v-row>
    </v-container>
    <v-container>
      <v-row>
        <v-col>
          <v-form ref="form">
            <v-container>
              <v-row>
                <v-col cols="6">
                  <v-subheader>Specialization: </v-subheader>
                </v-col>
                <v-col cols="6">
                  <v-select v-model="specialization" :items="itemsSpecialization" :rules="specializationRules" solo required></v-select>
                </v-col>
              </v-row>
              </v-container>
            <v-container>
              <v-row>
                <v-col cols="6">
                  <v-subheader>District: </v-subheader>
                </v-col>
                <v-col cols="6">
                  <v-select v-model="district" :items="itemsDistrict" :rules="districtRules" solo required></v-select>
                </v-col>
              </v-row>
            </v-container>
            <v-container>
              <v-row>
                <v-col cols="6">
                  <v-btn color="success" class="mr-4" @click="getViewLawyers(specialization,district)">Search</v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
    <v-container>
      <v-row>
        <v-col v-bind:key="lawyer.id" v-for="lawyer in lawyers" cols="12" md="3">
          <v-card max-width="250" outlined class="mx-auto">
            <v-img src="https://img.lalr.co/cms/2017/10/06191633/abogado.jpg?size=xl"></v-img>
            <v-card-title> {{ lawyer.lawyerName }} {{ lawyer.lawyerLastName}}</v-card-title>
            <v-card-subtitle> {{ lawyer.email }}</v-card-subtitle>
            <v-card-text><v-rating :value="4.5" color="amber" dense half-increments readonly size="30"></v-rating></v-card-text>
            <v-card-actions>
              <v-btn color="orange lighten-2" text>More Information</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-item-group>
</template>

<script>
import LawyersServices from "../services/lawyers.services";

export default {
  name: "container-lawyers",
  data: () => ({
    idLawyer: null,
    specialization: null,
    district: null,
    lawyers: [],
    itemsSpecialization: [
      'Business Law',
      'Real State Law',
      'Civil Law',
      'Construction Law',
      'Elder Law'
    ],
    itemsDistrict: [
      'Callao',
      'San Martin',
      'San Miguel',
      'Los Olivos',
      'Pueblo Libre'
    ],
    specializationRules:[v => !!v || "Specialization is required"],
    districtRules: [v => !!v || "District is required"]
  }),
  methods: {
    getDisplayLawyers(lawyer) {
      return {
        id: lawyer.id,
        lawyerName: lawyer.lawyerName,
        lawyerLastName: lawyer.lawyerLastName,
        email: lawyer.email,
      };
    },
    getViewLawyers(specialization, address) {
      if (this.$refs.form.validate()) {
        this.lawyers = [];
        this.getLawyerBySpecializationAndAddress(specialization, address);
      }
    },
    //Methods Services
    getLawyers() {
      LawyersServices.getAll()
        .then(response => {
          this.lawyers = response.data.map(this.getDisplayLawyers);
          console.log(this.lawyers);
        })
        .catch(e => {
          console.log(e);
        });
    },
    getLawyerBySpecializationAndAddress(specialization, address) {
      LawyersServices.getBySpecializationAndAddress(specialization, address)
          .then(response => {
            this.lawyers = response.data.map(this.getDisplayLawyers);
            console.log(this.lawyers);
          })
          .catch(e => {
            console.log(e);
          })
    }
  },
  created() {
    this.getLawyers();
  },
};
</script>

<style scoped></style>

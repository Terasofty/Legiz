<template>
  <v-container class="justify-center">
    <v-layout>
      <v-flex>
        <h2 class="text-center">Case information</h2>
        <v-dialog v-model="dialog" max-width="500px">
          <!--Edit Dialog-->
          <v-card>
            <v-card-title>Reschedule</v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4" lg="12">
                    <!--v-text-field v-model="editedItem" label="Tutorial Title"></v-text-field-->
                    <template>
                      <v-row justify="center">
                        Date:
                        <v-date-picker
                          v-model="date"
                          :allowed-dates="allowedDates"
                          class="mt-4"
                          min="2021-10-24"
                          max="2021-10-31"
                        ></v-date-picker>
                        Time:
                        <template>
                          <v-row justify="space-around">
                            <v-time-picker
                              v-model="time"
                              :allowed-hours="allowedHours"
                              :allowed-minutes="allowedMinutes"
                              class="mt-4"
                              format="24hr"
                              scrollable
                              min="08:00"
                              max="22:00"
                            ></v-time-picker>
                          </v-row>
                        </template>
                      </v-row>
                    </template>
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
        <v-row>
          <v-img
            max-height="250"
            max-width="250"
            src="https://st2.depositphotos.com/4431055/11854/i/950/depositphotos_118543600-stock-photo-handsome-caucasian-lawyer.jpg"
          ></v-img>
          <v-card>
            <v-card-title> Armando Rojas </v-card-title>
            <v-card-text>
              Age: 30 años<br />
              Specialty: Derecho Civil<br />
              Date: 03/09/21
            </v-card-text>
            <v-card-actions>
              <v-btn text color="blue" @click="editItem(item)"> Reschedule </v-btn>
            </v-card-actions>
          </v-card>
        </v-row>
        <v-col>
          <h2 class="text-center">My documents</h2>
        </v-col>
        <v-row>
          <v-col>
            <v-img
              max-height="100"
              max-width="100"
              src="https://cdn.icon-icons.com/icons2/2368/PNG/512/file_document_icon_143784.png"
            ></v-img>
            <p>File 1</p>
          </v-col>
          <v-col>
            <v-img
              max-height="100"
              max-width="100"
              src="https://cdn.icon-icons.com/icons2/2368/PNG/512/file_document_icon_143784.png"
            ></v-img>
            <p>File 2</p>
          </v-col>
        </v-row>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "case-information",
  data: () => ({
    date: "2021-10-24",
    dialog: false,
    time: "11:15",
  }),
  watch: {
    dialog(val) {
      val || this.close();
    },
  },
  methods: {
    allowedDates: (val) => parseInt(val.split("-")[2], 10) % 2 === 0,
    allowedHours: (v) => v % 2,
    allowedMinutes: (v) => v >= 10 && v <= 50,
    editItem(item) {
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    close() {
      this.dialog = false;
    },
    save() {
      //TODO: Insert or Update item
    },
  },
};
</script>

<style scoped></style>

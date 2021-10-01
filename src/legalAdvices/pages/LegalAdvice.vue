<template class="temp">
  <v-row justify="center" class="px-3 mx-auto">
    <v-col cols="12" md="5" justify="center">
      <br><br>
      <h1 class="text-center" style="color: #5b9ec3">Query register</h1>
      <v-form ref="form">
        <br><br>
        <label>Type of specialization: </label>
        <select v-model="selectSpec" style=" max-height: 180px; border: 1px solid black;" >
          <option value="one">Bankruptcy Law</option>
          <option value="two">Civil Rights Law</option>
          <option value="three">Criminal Law</option>
          <option value="four">Entertainment Law</option>
          <option value="five">Family Law</option>
        </select>
        <br><br>
        <label>Lawyers available:</label>
        <select v-model="selectLawyer" style="border: 1px solid black;" >
          <option value="Law.1">Hugo Quezada</option>
          <option value="Law.2">Tomas Angulo</option>
          <option value="Law.3">Roberto Matias</option>
        </select>
        <br><br>
        <label>Payment method:</label>
        <select v-model="selectPaym" style="border: 1px solid black;" >
          <option value="Pay.1">**** **** **** 8794</option>
          <option value="Pay.2" disabled>agregar un método de pago...</option>
        </select>
        <br><br>
        <label>Email:</label>
        <v-text-field type="text" placeholder="Type your email" name="email" id="email"></v-text-field>
        <label>Affair:</label>
        <v-text-field type="text" placeholder="What is your query about?" name="affair" id="affair"></v-text-field>
        <label>Query:</label>
        <v-text-field type="text" placeholder="Write your query" name="query" id="query"></v-text-field>
        <v-btn class="mr-4 btn primary" @click="validated()">REGISTER</v-btn>
      </v-form>
    </v-col>
  </v-row>
</template>

<script>
let required;
export default {
  name: "LegalAdvice",
  data: () => {
    return {
      selectSpec:"",
      selectLawyer: "",
      selectPaym: "",
      email: null,
      affair: null,
      query: null
    }
  },
};
</script>

<style></style>
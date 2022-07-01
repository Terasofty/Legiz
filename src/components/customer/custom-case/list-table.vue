<template>
  <a-button
    id="add-case"
    style="margin-bottom: 10px"
    type="primary" @click="handleClick"
  > Add Custom Case
  </a-button>

  <a-table
    :columns="columns"
    :pagination="{ pageSize: 10 }"
    :data-source="customCases"
    :row-class-name="(_record, index) => (index % 2 === 1 ? 'table-striped' : null)"
    bordered
  >
    <template #title>Custom cases ({{ customCases.length }})</template>
    <template #bodyCell="{ column, record, index }">
      <template v-if="column.key === 'specializations'">
        <span> {{ record.lawyer.specializations.map((s) => s.name).join(", ") }} </span>
      </template>
      <template v-if="column.key === 'actions'">
        <a-dropdown v-model:visible="visible">
          <a-tag color="green" @click="handleCaseDetails(record.id)">
            Details
          </a-tag>
        </a-dropdown>
      </template>
    </template>
  </a-table>
  <a-modal v-model:visible="modalVisibility" title="Add Custom Case" centered @ok="handleClick">
    <new-form />
  </a-modal>
</template>

<script>
import { getAll } from "@/services/customCase.service";
import newForm from "./new-form.vue";
export default {
  name: "custom-case-customer",
  data() {
    return {
      loading: false,
      customCases: [],
      error: null,
      modalVisibility: false,
      visible: false,
    };
  },
  created() {
    this.$watch(
      () => this.$route.params,
      () => {
        this.fetchData();
      },
      { immediate: true }
    );
  },
  methods: {
    fetchData() {
      this.error = null;
      this.loading = true;
      getAll().then(({ data }) => (this.customCases = data));
    },
    handleClick() {
      this.modalVisibility = !this.modalVisibility;
    },
    handleCaseDetails(id) {
      this.$router.push({ path: `/services/custom_cases/${id}` });
    },
  },
  setup() {
    return {
      columns: [
        { title: "ID", dataIndex: "id", key: "id" },
        { title: "Lawyer Name", dataIndex: ["lawyer", "user", "firstName"], key: "lawyer" },
        { title: "Specializations", dataIndex: ["lawyer", "specializations", "firstName"], key: "specializations" },
        { title: "Description", dataIndex: ["customCase", "description"], key: "description" },
        { title: "", key: "actions" },
      ],
    };
  },
  components: {
    newForm,
  },
};
</script>

<style scoped></style>

<template>
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
    </template>
  </a-table>
</template>

<script>
import { getAll } from "@/services/customCase.service";
export default {
  name: "custom-case-customer",
  data() {
    return {
      loading: false,
      customCases: [],
      error: null,
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
  },
  setup() {
    return {
      columns: [
        { title: "ID", dataIndex: "id", key: "id" },
        { title: "Lawyer Name", dataIndex: ["lawyer", "user", "firstName"], key: "lawyer" },
        { title: "Specializations", dataIndex: ["lawyer", "specializations", "firstName"], key: "specializations" },
        { title: "Description", dataIndex: ["customCase", "description"], key: "description" },
      ],
    };
  },
};
</script>

<style scoped></style>

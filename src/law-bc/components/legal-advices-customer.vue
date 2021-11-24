<template>
  <a-table
    :columns="columns"
    :pagination="{ pageSize: 10 }"
    :data-source="legalAdvices"
    :row-class-name="(_record, index) => (index % 2 === 1 ? 'table-striped' : null)"
    bordered
  >
    <template #title>Legal Advices</template>

    <template #headerCell="{ column }">
      <template v-if="column.key === 'name'">
        <span> Name </span>
      </template>
    </template>

    <template #bodyCell="{ column, record, index }">
      <template v-if="column.key === 'name'">
        <a>
          {{ record.name }}
        </a>
      </template>
      <template v-else-if="column.key === 'status'">
        <span>
          <a-tag v-if="record.statusLawService.toUpperCase() === 'PROCESS'" color="volcano">
            {{ record.statusLawService.toUpperCase() }}
          </a-tag>
          <a-tag v-else color="green">
            {{ record.statusLawService.toUpperCase() }}
          </a-tag>
        </span>
      </template>
      <template v-else-if="column.key === 'index'">
        <span>
          {{ (index = index + 1) }}
        </span>
      </template>
      <template v-else-if="column.key === 'lawyer'">
        <span> {{ record.lawyer.firstName }} {{ record.lawyer.lastName }} </span>
      </template>
      <!--      <template v-else-if="column.key === 'action'">-->
      <!--        <span>-->
      <!--          <a>Invite 一 {{ record.name }}</a>-->
      <!--          <a-divider type="vertical" />-->
      <!--          <a>Delete</a>-->
      <!--          <a-divider type="vertical" />-->
      <!--          <a class="ant-dropdown-link">-->
      <!--            More actions-->
      <!--            <down-outlined />-->
      <!--          </a>-->
      <!--        </span>-->
      <!--      </template>-->
    </template>
  </a-table>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";

const columns = [
  {
    title: "Nº",
    key: "index",
    width: "50px",
  },
  {
    title: "Title",
    dataIndex: "title",
  },
  {
    title: "Description",
    dataIndex: "description",
  },
  {
    title: "Legal Response",
    dataIndex: "legalResponse",
  },
  {
    title: "Lawyer",
    key: "lawyer",
  },
  {
    title: "Status",
    dataIndex: "statusLawService",
    key: "status",
    width: "120px",
  },
];

export default {
  name: "legal-advices-customer",
  setup() {
    const store = useStore();
    return {
      legalAdvices: computed(() => store.state.customer.legalAdvices),
      columns,
    };
  },
};
</script>

<style scoped>
.ant-table-striped :deep(.table-striped) td {
  background-color: #fafafa;
}
</style>

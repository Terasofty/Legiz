<template>
  <div>
    <a-table
      :columns="columns"
      :pagination="{ pageSize: 10 }"
      :data-source="customCases"
      :row-class-name="(_record, index) => (index % 2 === 1 ? 'table-striped' : null)"
      bordered
    >
      <template #title>Custom cases</template>

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
        <template v-else-if="column.key === 'customer'">
          <span> {{ record.customer.firstName }} {{ record.customer.lastName }} </span>
        </template>
        <template v-else-if="column.key === 'action'">
        <span>
          <a>Response</a>
        </span>
        </template>
      </template>
    </a-table>

<!--    <a-drawer-->
<!--      title="Create a new account"-->
<!--      :width="720"-->
<!--      :visible="visible"-->
<!--      :body-style="{ paddingBottom: '80px' }"-->
<!--      :footer-style="{ textAlign: 'right' }"-->
<!--      @close="onClose"-->
<!--    >-->
<!--      <a-form :model="form" :rules="rules" layout="vertical">-->
<!--        <a-row :gutter="16">-->
<!--          <a-col :span="12">-->
<!--            <a-form-item label="Name" name="name">-->
<!--              <a-input v-model:value="form.name" placeholder="Please enter user name" />-->
<!--            </a-form-item>-->
<!--          </a-col>-->
<!--          <a-col :span="12">-->
<!--            <a-form-item label="Url" name="url">-->
<!--              <a-input-->
<!--                v-model:value="form.url"-->
<!--                style="width: 100%"-->
<!--                addon-before="http://"-->
<!--                addon-after=".com"-->
<!--                placeholder="please enter url"-->
<!--              />-->
<!--            </a-form-item>-->
<!--          </a-col>-->
<!--        </a-row>-->
<!--        <a-row :gutter="16">-->
<!--          <a-col :span="12">-->
<!--            <a-form-item label="Owner" name="owner">-->
<!--              <a-select v-model:value="form.owner" placeholder="Please a-s an owner">-->
<!--                <a-select-option value="xiao">Xiaoxiao Fu</a-select-option>-->
<!--                <a-select-option value="mao">Maomao Zhou</a-select-option>-->
<!--              </a-select>-->
<!--            </a-form-item>-->
<!--          </a-col>-->
<!--          <a-col :span="12">-->
<!--            <a-form-item label="Type" name="type">-->
<!--              <a-select v-model:value="form.type" placeholder="Please choose the type">-->
<!--                <a-select-option value="private">Private</a-select-option>-->
<!--                <a-select-option value="public">Public</a-select-option>-->
<!--              </a-select>-->
<!--            </a-form-item>-->
<!--          </a-col>-->
<!--        </a-row>-->
<!--        <a-row :gutter="16">-->
<!--          <a-col :span="12">-->
<!--            <a-form-item label="Approver" name="approver">-->
<!--              <a-select v-model:value="form.approver" placeholder="Please choose the approver">-->
<!--                <a-select-option value="jack">Jack Ma</a-select-option>-->
<!--                <a-select-option value="tom">Tom Liu</a-select-option>-->
<!--              </a-select>-->
<!--            </a-form-item>-->
<!--          </a-col>-->
<!--          <a-col :span="12">-->
<!--            <a-form-item label="DateTime" name="dateTime">-->
<!--              <a-date-picker-->
<!--                v-model:value="form.dateTime"-->
<!--                style="width: 100%"-->
<!--                :get-popup-container="trigger => trigger.parentNode"-->
<!--              />-->
<!--            </a-form-item>-->
<!--          </a-col>-->
<!--        </a-row>-->
<!--        <a-row :gutter="16">-->
<!--          <a-col :span="24">-->
<!--            <a-form-item label="Description" name="description">-->
<!--              <a-textarea-->
<!--                v-model:value="form.description"-->
<!--                :rows="4"-->
<!--                placeholder="please enter url description"-->
<!--              />-->
<!--            </a-form-item>-->
<!--          </a-col>-->
<!--        </a-row>-->
<!--      </a-form>-->
<!--      <template #footer>-->
<!--        <a-button style="margin-right: 8px" @click="onClose">Cancel</a-button>-->
<!--        <a-button type="primary" @click="onClose">Submit</a-button>-->
<!--      </template>-->
<!--    </a-drawer>-->
  </div>

</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

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
    title: "Start At",
    dataIndex: "startAt",
  },
  {
    title: "Finish At",
    dataIndex: "finishAt",
  },
  {
    title: "Type Meet",
    dataIndex: "typeMeet",
  },
  {
    title: "Link Zoom",
    dataIndex: "linkZoom",
  },
  {
    title: "Client",
    key: "customer",
  },
  {
    title: "Status",
    dataIndex: "statusLawService",
    key: "status",
    width: "120px",
  },
  {
    title: "Action",
    key: "action",
    width: "100px",
  },
];

export default {
  name: "custom-case-lawyer",
  setup() {
    const store = useStore();
    return {
      customCases: computed(() => store.state.lawyer.customCases),
      columns,
    };
  },
};
</script>

<style scoped></style>

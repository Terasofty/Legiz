<template>
  <div>
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
        <template v-else-if="column.key === 'customer'">
          <span> {{ record.customer.firstName }} {{ record.customer.lastName }} </span>
        </template>
        <template v-else-if="column.key === 'action'">
          <span>
            <a @click="showDrawer(record)">Response</a>
          </span>
        </template>
      </template>
    </a-table>

    <a-drawer
      title="Response legal advice"
      :width="720"
      :visible="visible"
      :body-style="{ paddingBottom: '80px' }"
      :footer-style="{ textAlign: 'right' }"
      @close="onClose"
    >
      <a-form :model="legalResponse" layout="vertical">
        <a-row :gutter="16">
          <a-col :span="24">
            <a-form-item label="Response" name="legalResponse">
              <a-textarea v-model:value="legalResponse.data" :rows="4" placeholder="please enter you answer" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
      <template #footer>
        <a-button style="margin-right: 8px" @click="onClose">Cancel</a-button>
        <a-button type="primary" @click="onResponseLegalAdvice">Submit</a-button>
      </template>
    </a-drawer>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed, reactive, ref } from "vue";
import LegalAdvice from "@/law-bc/models/legal-advice";
import { message } from "ant-design-vue";

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
  name: "legal-advices-lawyer",
  setup() {
    const store = useStore();
    const visible = ref(false);
    const legalResponse = reactive({
      data: "",
    });
    const legalAdvice = ref(new LegalAdvice());
    //rules
    const rules = reactive({
      legalResponse: [
        {
          required: true,
          message: "Please input title",
        },
      ],
    });

    // legal advice
    const showDrawer = (record) => {
      visible.value = true;
      legalAdvice.value = record;
    };

    const onClose = () => {
      visible.value = false;
    };

    const onResponseLegalAdvice = () => {
      legalAdvice.value.legalResponse = legalResponse.data;
      store.dispatch("lawyer/setMessageLegalAdvice", legalAdvice.value).then(
        (response) => {
          message.success(response.data.message);
        },
        (error) => {
          console.log(error);
        }
      );
    };

    return {
      legalAdvices: computed(() => store.state.lawyer.legalAdvices),
      columns,
      visible,
      rules,
      showDrawer,
      onClose,
      onResponseLegalAdvice,
      legalResponse,
    };
  },
};
</script>

<style scoped>
.ant-table-striped :deep(.table-striped) td {
  background-color: #fafafa;
}
</style>

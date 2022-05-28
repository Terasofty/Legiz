<template>
  <a-layout>
    <a-layout-content>
      <a-list :grid="{ gutter: [16, 50], xs: 1, sm: 2, md: 3, lg: 3, xl: 3, xxl: 4 }" :data-source="lawyers">
        <template #renderItem="{ item }">
          <a-list-item>
            <a-card hoverable style="width: 300px">
              <template #cover>
                <img
                  alt="example"
                  src="https://cdn.euroinnova.edu.es/img/subidasEditor/office-2820890_1920-1603984813.webp"
                />
              </template>
              <template #actions class="ant-card-actions">
                <a @click="showDrawerLegalAdvice(item.user.id)">Legal Advice</a>
                <a @click="showDrawerCustomCase(item.id)">Custom Case</a>
              </template>
              <a-card-meta>
                <template #title> {{ item.user.firstName }} {{ item.user.lastName }} </template>
                <template #description>
                  <p>{{ item.district }}</p>
                  <p>{{ item.university }}</p>
                  <p>{{ item.specialization }}</p>
                </template>
              </a-card-meta>
            </a-card>
          </a-list-item>
        </template>
      </a-list>
    </a-layout-content>

    <!--    legal advice-->
    <a-drawer
      title="Create a new legal advice"
      :width="720"
      :visible="visibleLegalAdvice"
      :body-style="{ paddingBottom: '80px' }"
      :footer-style="{ textAlign: 'right' }"
      @close="onCloseLegalAdvice"
    >
      <a-form ref="formRef" :rules="rules" :model="legalAdvice" layout="vertical">
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="Title" name="title">
              <a-input v-model:value="legalAdvice.title" placeholder="Please enter title" />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="Description" name="description">
              <a-textarea v-model:value="legalAdvice.description" :rows="4" placeholder="please enter description" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
      <template #footer>
        <a-button style="margin-right: 8px" @click="onCloseLegalAdvice">Cancel</a-button>
        <a-button type="primary" @click="onAddLegalAdvice">Submit</a-button>
      </template>
    </a-drawer>

    <!--        custom case-->
    <a-drawer
      title="Create a new account"
      :width="720"
      :visible="visibleCustomCase"
      :body-style="{ paddingBottom: '80px' }"
      :footer-style="{ textAlign: 'right' }"
      @close="onCloseCustomCase"
    >
      <a-form ref="formRefCustomCase" :rules="rulesCustomCase" :model="customCase" layout="vertical">
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="Title" name="title">
              <a-input v-model:value="customCase.title" placeholder="Please enter title" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="Start" name="startAt">
              <a-date-picker
                style="width: 100%"
                show-time
                :disabled-date="disabledDate"
                placeholder="Select Time"
                @change="onChange"
                @ok="onOk"
                :get-popup-container="(trigger) => trigger.parentNode"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="Type meet" name="typeMeet">
              <a-select v-model:value="customCase.typeMeet" placeholder="Please choose the type meet">
                <a-select-option :value="1">Online</a-select-option>
                <a-select-option :value="2">Face to Face</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
      <template #footer>
        <a-button style="margin-right: 8px" @click="onCloseCustomCase">Cancel</a-button>
        <a-button type="primary" @click="onAddCustomCase">Submit</a-button>
      </template>
    </a-drawer>
  </a-layout>
</template>

<script>
import { computed, reactive, ref } from "vue";
import { useStore } from "vuex";
import { message } from "ant-design-vue";
import LegalAdvice from "@/law-bc/models/legal-advice";
import CustomCase from "@/law-bc/models/custom-case";
import dayjs from "dayjs";
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  BarChartOutlined,
  LaptopOutlined,
} from "@ant-design/icons-vue";

export default {
  name: "lawyers-container",
  components: {
    UserOutlined,
    LaptopOutlined,
  },
  setup() {
    const store = useStore();
    const formRef = ref();
    const formRefCustomCase = ref();
    const visibleLegalAdvice = ref(false);
    const visibleCustomCase = ref(false);
    const legalAdvice = ref(new LegalAdvice("", 2, "", "", "", 1));
    const customCase = ref(new CustomCase("", "", "", "", 2, "", "", 1));

    //rules
    const rules = reactive({
      title: [
        {
          required: true,
          message: "Please input title",
        },
      ],
      description: [
        {
          required: true,
          message: "Please input description",
        },
      ],
    });

    const rulesCustomCase = reactive({
      title: [
        {
          required: true,
          message: "Please input title",
        },
      ],
      // startAt: [
      //   {
      //     required: true,
      //     message: "Please input startAt",
      //   },
      // ],
      typeMeet: [
        {
          required: true,
          message: "Please input type meet",
        },
      ],
    });

    // legal advice
    const showDrawerLegalAdvice = (lawyerId) => {
      visibleLegalAdvice.value = true;
      legalAdvice.value.lawyerId = lawyerId;
    };

    const onCloseLegalAdvice = () => {
      visibleLegalAdvice.value = false;
    };

    const onAddLegalAdvice = () => {
      formRef.value
        .validate()
        .then(() => {
          legalAdvice.value.customerId = store.state.auth.user.id;
          store.dispatch("customer/createLegalAdvice", legalAdvice.value).then(
            () => {
              message.success("Successful.");
              onCloseLegalAdvice();
              formRef.value.resetFields();
              legalAdvice.value = new LegalAdvice("", 2, "", "", "", 1);
            },
            (error) => {
              console.log(error);
            }
          );
        })
        .catch((err) => {
          console.log(err);
        });
    };

    //custom case
    const showDrawerCustomCase = (lawyerId) => {
      visibleCustomCase.value = true;
      customCase.value.lawyerId = lawyerId;
    };

    const onCloseCustomCase = () => {
      visibleCustomCase.value = false;
    };

    const onAddCustomCase = () => {
      formRefCustomCase.value
        .validate()
        .then(() => {
          customCase.value.customerId = store.state.auth.user.id;
          store.dispatch("customer/createCustomCase", customCase.value).then(
            () => {
              message.success("Successful.");
              onCloseCustomCase();
              formRefCustomCase.value.resetFields();
              customCase.value = new CustomCase("", "", "", "", 2, "", "", 1);
            },
            (error) => {
              console.log(error);
            }
          );
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const onChange = (value, dateString) => {
      console.log("Selected Time: ", value);
      console.log("Formatted Selected Time: ", dateString);
    };

    const onOk = (value) => {
      console.log("onOk: ", value);
      customCase.value.startAt = value.format("DD-MM-YYYY HH:mm");
      customCase.value.finishAt = value.add(1, "hour").format("DD-MM-YYYY HH:mm");
    };

    const disabledDate = (current) => {
      // Can not select days before today and today
      return current && current < dayjs().endOf("day");
    };

    return {
      lawyers: computed(() => store.state.lawyer.all),
      visibleLegalAdvice,
      legalAdvice,
      showDrawerLegalAdvice,
      onCloseLegalAdvice,
      onAddLegalAdvice,
      visibleCustomCase,
      customCase,
      showDrawerCustomCase,
      onCloseCustomCase,
      onAddCustomCase,
      onChange,
      onOk,
      disabledDate,
      rules,
      rulesCustomCase,
      formRef,
      formRefCustomCase,
      selectedKeys: ref(["1"]),
      openKeys: ref(["sub1"]),
    };
  },
};
</script>

<style scoped lang="less">
.ant-layout {
  min-height: calc(100vh - 64px - 24px - 24px);
  &-content {
    padding: 15px;
  }
}
</style>

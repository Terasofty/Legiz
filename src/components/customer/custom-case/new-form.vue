<template>
  <a-form :label-col="labelCol" :wrapper-col="wrapperCol">
    <a-form-item label="Lawyer Username" v-bind="validateInfos.lawyerUsername">
      <a-input id="username" v-model:value="modelRef.lawyerUsername" placeholder="Lawyer Username" />
    </a-form-item>
    <a-form-item label="Description" v-bind="validateInfos.description">
      <a-textarea id="description" v-model:value="modelRef.description" />
    </a-form-item>
    <a-button id="submit" type="primary" @click.prevent="onSubmit">Create</a-button>
    <a-button style="margin-left: 10px" @click="resetFields">Reset</a-button>
  </a-form>
</template>

<script>
import { computed, defineComponent, reactive, toRaw } from "vue";
import { toArray } from "lodash";
import { create } from "@/services/customCase.service";
import { Form } from "ant-design-vue";
const useForm = Form.useForm;
export default defineComponent({
  setup() {
    const modelRef = reactive({
      lawyerUsername: "",
      description: "",
    });
    const rulesRef = reactive({
      lawyerUsername: [{ required: true, message: "Please input the lawyer username" }],
      description: [{ required: true, message: "Please input your description" }],
    });
    const { resetFields, validate, validateInfos, mergeValidateInfo } = useForm(modelRef, rulesRef);
    const onSubmit = () => {
      validate()
        .then(() => {
          console.log("validated!");
          create(toRaw(modelRef));
          resetFields();
        })
        .catch(() => {
          console.log("invalidated!");
        });
    };
    const errorInfos = computed(() => {
      return mergeValidateInfo(toArray(validateInfos));
    });

    return {
      labelCol: {
        span: 4,
      },
      wrapperCol: {
        span: 14,
      },
      validateInfos,
      modelRef,
      errorInfos,
      resetFields,
      onSubmit,
    };
  },
});
</script>

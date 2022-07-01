<template>
  <a-layout>
    <a-layout-content>
      <a-list :grid="{ gutter: [16, 50], xs: 1, sm: 2, md: 2, lg: 3, xl: 4, xxl: 5 }" :data-source="lawyers">
        <template #renderItem="{ item }">
          <a-list-item>
            <a-card hoverable style="width: 300px">
              <template #cover>
                <img :alt="item.firstName" :src="item.photoUrl" style="height: 200px" />
              </template>
              <template #actions class="ant-card-actions">
                <a @click="showDrawerLegalAdvice(item)">Legal Advice</a>
                <a @click="showDrawerCustomCase(item)">Custom Case</a>
              </template>
              <a-card-meta>
                <template #title> {{ item.user.firstName }} {{ item.user.lastName }} </template>
                <template #description>
                  <p class="experience">
                    {{ item.experience }}
                  </p>
                  <a-tag color="pink" v-for="(specialization, index) in item.specializations" :key="index">
                    {{ specialization.name }}
                  </a-tag>
                </template>
              </a-card-meta>
            </a-card>
          </a-list-item>
        </template>
      </a-list>
    </a-layout-content>

    <!--    legal advice-->
    <a-drawer
      :title="`Create a new Legal Advice with ${selectedLawyer.user?.firstName}`"
      :width="720"
      :visible="visibleLegalAdvice"
      :body-style="{ paddingBottom: '80px' }"
      :footer-style="{ textAlign: 'right' }"
      @close="onCloseLegalAdvice"
    >
      <a-form ref="formRef" :rules="rules" :model="legalAdvice" layout="vertical">
        <a-row>
          <a-card size="small" title="Meet your Lawyer" :bordered="false" style="width: 300px">
            <img :src="selectedLawyer.photoUrl" style="height: 200px" />
            <p>{{ selectedLawyer.experience }}</p>
          </a-card>
        </a-row>
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
        <a-button type="primary" @click="handleSubmitLegalAdvice(selectedLawyer.user.username)">Submit</a-button>
      </template>
    </a-drawer>

    <!--        custom case-->
    <a-drawer
      :title="`Create a new Custom case with ${selectedLawyer.user?.firstName}`"
      :width="720"
      :visible="visibleCustomCase"
      :body-style="{ paddingBottom: '80px' }"
      :footer-style="{ textAlign: 'right' }"
      @close="onCloseCustomCase"
    >
      <a-form ref="formRefCustomCase" :rules="rulesCustomCase" :model="customCase" layout="vertical">
        <a-row>
          <a-card size="small" title="Meet your Lawyer" :bordered="false" style="width: 300px">
            <img :src="selectedLawyer.photoUrl" style="height: 200px" />
            <p>{{ selectedLawyer.experience }}</p>
          </a-card>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="Title" name="title">
              <a-input v-model:value="customCase.title" placeholder="Please enter title" />
            </a-form-item>
            <a-form-item label="Description" name="description">
              <a-textarea v-model:value="customCase.description" placeholder="Please enter description" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
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
        <a-button
          type="primary"
          :disabled="customCase.description === '' || customCase.title === ''"
          @click="handleSubmitCustomCase(selectedLawyer.user.username)"
          >Submit</a-button
        >
      </template>
    </a-drawer>
  </a-layout>
</template>

<script>
import { computed, reactive, ref } from "vue";
import { useStore } from "vuex";
import { UserOutlined, LaptopOutlined } from "@ant-design/icons-vue";
import { create } from "@/services/customCase.service";
import { message } from "ant-design-vue";

export default {
  name: "lawyers-container",
  components: {
    UserOutlined,
    LaptopOutlined,
  },
  data() {
    return {
      selectedLawyer: {
        user: {
          firstName: "",
          lastName: "",
          photoUrl: "",
        },
        specializations: [],
        experience: "",
      },
      visibleLegalAdvice: false,
      visibleCustomCase: false,
      customCase: {
        title: "",
        description: "",
      },
      legalAdvice: {
        title: "",
        description: "",
      },
    };
  },
  methods: {
    showDrawerLegalAdvice(lawyer) {
      this.visibleLegalAdvice = true;
      this.selectedLawyer = lawyer;
    },
    onCloseLegalAdvice() {
      this.visibleLegalAdvice = false;
    },
    handleSubmitLegalAdvice(lawyerUsername) {
      console.log(lawyerUsername);
    },
    showDrawerCustomCase(lawyer) {
      this.visibleCustomCase = true;
      this.selectedLawyer = lawyer;
    },
    onCloseCustomCase() {
      this.visibleCustomCase = false;
    },
    async handleSubmitCustomCase(lawyerUsername) {
      await create({
        title: this.customCase.title,
        clientUsername: this.$store.state.auth.user.username,
        lawyerUsername: lawyerUsername,
        type: "custom",
        description: this.customCase.description,
      })
        .then(({ data }) => {
          this.$router.push(`/services/custom_cases/${data.id}`);
        })
        .catch(() => {
          this.visibleCustomCase = false;
          message.error("Oops Something went wrong");
        });
    },
  },
  setup() {
    const store = useStore();
    const formRef = ref();
    const formRefCustomCase = ref();
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
      description: [
        {
          required: true,
          message: "Please input description",
        },
      ],
      typeMeet: [
        {
          required: true,
          message: "Please input type meet",
        },
      ],
    });

    return {
      lawyers: computed(() => store.state.lawyer.all),
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
.experience {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* number of lines to show */
  line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>

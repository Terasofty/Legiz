<template>
  <a-layout>
    <a-layout-sider>
      <a-menu
        v-model:selectedKeys="selectedKeys2"
        v-model:openKeys="openKeys"
        mode="inline"
        theme="dark"
        :style="{ height: '100%', borderRight: 0 }"
      >
        <a-sub-menu key="sub1">
          <template #title>
            <span>
              <user-outlined />
              {{ nameUser }}
            </span>
          </template>
          <a-menu-item key="1" @click="onSetLegalAdvice">Legal Advices</a-menu-item>
          <a-menu-item key="2" @click="onSetCustomCase">Custom Case</a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>
    <a-layout-content>
      <div v-if="userType === 'ROLE_CUSTOMER'">
        <div v-if="isLegalAdvice">
          <legal-advices-customer />
        </div>
        <div v-else>
          <custom-case-customer />
        </div>
      </div>
      <div v-else>
        <div v-if="isLegalAdvice">
          <legal-advices-lawyer />
        </div>
        <div v-else>
          <custom-case-lawyer />
        </div>
      </div>
    </a-layout-content>
  </a-layout>
</template>

<script>
import { UserOutlined } from "@ant-design/icons-vue";
import { computed, ref, watchEffect } from "vue";
import { useStore } from "vuex";
import LegalAdvicesCustomer from "../../law-bc/components/legal-advices-customer";
import CustomCaseCustomer from "../../law-bc/components/custom-case-customer";
import LegalAdvicesLawyer from "../../law-bc/components/legal-advices-lawyer";
import CustomCaseLawyer from "../../law-bc/components/custom-case-lawyer";

export default {
  name: "profile-container",
  components: {
    UserOutlined,
    LegalAdvicesCustomer,
    CustomCaseCustomer,
    LegalAdvicesLawyer,
    CustomCaseLawyer,
  },
  setup() {
    const store = useStore();
    const isLegalAdvice = ref(true);
    const nameUser = ref("");
    const userType = ref("");
    const onSetLegalAdvice = () => {
      isLegalAdvice.value = true;
    };

    const onSetCustomCase = () => {
      isLegalAdvice.value = false;
    };

    watchEffect(
      () => {
        if (store.state.auth.status.loggedIn) {
          nameUser.value = store.state.auth.user.firstName;
          store.state.auth.user.roles.forEach(({ name }) => {
            if (name !== "ROLE_ADMIN") userType.value = name;
          });
        }
      },
      {
        flush: "post",
      }
    );

    return {
      onSetLegalAdvice,
      onSetCustomCase,
      isLegalAdvice,
      selectedKeys1: ref(["2"]),
      selectedKeys2: ref(["1"]),
      collapsed: ref(false),
      openKeys: ref(["sub1"]),
      nameUser,
      userType,
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

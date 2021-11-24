<template>
  <a-layout id="legiz">
    <l-nav-header />

    <a-layout-content :style="{ padding: '0 50px', marginTop: '64px' }">
      <div :style="{ background: '#fff', padding: '24px', minHeight: '380px' }">
        <router-view></router-view>
      </div>
    </a-layout-content>
  </a-layout>
</template>

<script>
import LNavHeader from "@/shared/components/nav-header";
import { useStore } from "vuex";
import { watchEffect } from "vue";

export default {
  name: "app",
  components: {
    LNavHeader,
  },

  setup() {
    const store = useStore();

    watchEffect(
      () => {
        if (store.state.auth.status.loggedIn) {
          let id = store.state.auth.user.id;
          store.dispatch("lawyer/getLawyers");
          if (store.state.auth.user.userType === "Customer") {
            store.dispatch("customer/getLegalAdvices", id);
            store.dispatch("customer/getCustomCases", id);
          } else {
            store.dispatch("lawyer/getLegalAdvices", id);
            store.dispatch("lawyer/getCustomCases", id);
          }
        }
      },
      {
        flush: "post",
      }
    );

    return {};
  },
};
</script>

<style lang="less" scoped>
#legiz .logo {
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 24px 16px 0;
  float: left;
  display: inline-block;
}

.site-layout .site-layout-background {
  background: #fff;
}

[data-theme="dark"] .site-layout .site-layout-background {
  background: #141414;
}
</style>

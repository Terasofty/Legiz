<template>
  <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%' }">
    <a-row type="flex">
      <a-col flex="auto">
        <div :style="{ float: 'left' }">
          <a @click="onClick('Home')" :style="{ color: 'white', fontWeight: 'bold' }">Legiz</a>
          <a-divider type="vertical" />
        </div>
        <a-menu
          v-if="true"
          v-model:selectedKeys="selectedKeys"
          theme="dark"
          mode="horizontal"
          :style="{ lineHeight: '64px' }"
        >
          <a-menu-item v-for="menu in menuHeaderMainCustomer" :key="menu.name" @click="onClick(menu.name)">
            {{ menu.title }}
          </a-menu-item>
        </a-menu>

        <a-menu
          v-else-if="false"
          v-model:selectedKeys="selectedKeys"
          theme="dark"
          mode="horizontal"
          :style="{ lineHeight: '64px' }"
        >
          <a-menu-item v-for="menu in menuHeaderMainLawyer" :key="menu.name">
            {{ menu.title }}
          </a-menu-item>
        </a-menu>
      </a-col>
      <a-col flex="150px">
        <span v-if="loggedIn"> Welcome {{ user }}</span>
        <a @click="onLogout" v-if="loggedIn" :style="{ float: 'right', color: 'white' }" id="logout">Log out</a>
        <a id="login" @click="onClick('Login')" v-else :style="{ float: 'right', color: 'white' }">Log in</a>
      </a-col>
    </a-row>
  </a-layout-header>
</template>

<script>
import { computed, ref, watchEffect } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { message } from "ant-design-vue";

const menuHeaderMainCustomer = [
  { title: "Profile", name: "Profile" },
  { title: "Lawyers", name: "Lawyers" },
  { title: "About", name: "About" },
];

const menuHeaderMainLawyer = [
  { title: "Profile", name: "Profile" },
  { title: "About", name: "About" },
];

const menuHeaderLoggedIn = [
  { title: "Log in", name: "Login", loggedIn: false },
  { title: "Log out", name: "Logout", loggedIn: false },
];

export default {
  name: "nav-header",
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();

    const selectedKeys = ref([]);

    const onClick = (name) => {
      router.push({ name: name });
    };

    const onLogout = () => {
      store.dispatch("auth/logout");
      router.push({ name: "Home" });
      message.success("Logout");
    };

    watchEffect(
      () => {
        selectedKeys.value = [`${route.name}`];
      },
      {
        flush: "post",
      }
    );

    return {
      loggedIn: computed(() => store.state.auth.status.loggedIn),
      user: computed(() => store.state.auth.user),
      menuHeaderMainCustomer,
      menuHeaderMainLawyer,
      menuHeaderLoggedIn,
      onClick,
      onLogout,
      selectedKeys,
    };
  },
};
</script>

<style scoped lang="less">
.display-none {
  display: none !important;
}
</style>

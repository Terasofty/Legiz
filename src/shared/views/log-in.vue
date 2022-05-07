<template>
  <div :style="{ display: 'flex', justifyContent: 'center', minHeight: 'calc(100vh - 64px - 24px - 24px)' }">
    <div v-if="isLogin">
      <a-card title="Login" style="width: 500px">
        <template #extra><a @click="onSignup">Sign up</a></template>
        <a-form :model="user" :label-col="labelCol" :wrapper-col="wrapperCol">
          <a-form-item label="User">
            <a-input v-model:value="user.username" placeholder="Username" id="username_field">
              <template #prefix><UserOutlined style="color: rgba(0, 0, 0, 0.25)" /></template>
            </a-input>
          </a-form-item>
          <a-form-item label="Password">
            <a-input v-model:value="user.password" type="password" placeholder="Password" id="password_field">
              <template #prefix><LockOutlined style="color: rgba(0, 0, 0, 0.25)" /></template>
            </a-input>
          </a-form-item>
          <a-form-item :style="{ justifyContent: 'center', textAlign: 'center' }">
            <a-button type="primary" @click="login" id="submit">Login</a-button>
          </a-form-item>
        </a-form>
      </a-card>
    </div>

    <div v-else>
      <a-card title="Register" style="width: 500px">
        <template #extra><a @click="onLogin">Log in</a></template>

        <a-row type="flex" justify="center" :style="{ margin: '0 0 20px 0' }">
          <a-col :span="10">
            <a-radio-group v-model:value="typeUser" label="asd">
              <a-radio value="customer" name="type">Customer</a-radio>
              <a-radio value="lawyer" name="type">Lawyer</a-radio>
            </a-radio-group>
          </a-col>
        </a-row>

        <!--        customer-->
        <a-form v-if="typeUser === 'customer'" :model="customer" :label-col="labelCol" :wrapper-col="wrapperCol">
          <a-form-item label="First Name">
            <a-input v-model:value="customer.firstName" />
          </a-form-item>
          <a-form-item label="Last Name">
            <a-input v-model:value="customer.lastName" />
          </a-form-item>
          <a-form-item label="Email">
            <a-input v-model:value="customer.email" />
          </a-form-item>
          <a-form-item label="Phone">
            <a-input v-model:value="customer.phone" />
          </a-form-item>
          <a-form-item label="DNI">
            <a-input v-model:value="customer.dni" />
          </a-form-item>
          <a-form-item label="Username">
            <a-input v-model:value="customer.username" id="username"/>
          </a-form-item>
          <a-form-item label="Password">
            <a-input-password v-model:value="customer.password" placeholder="input password" />
          </a-form-item>
          <a-form-item :style="{ justifyContent: 'center', textAlign: 'center' }">
            <a-button type="primary" @click="registerCustomer">Register</a-button>
          </a-form-item>
        </a-form>

        <!--        lawyer-->
        <a-form v-if="typeUser === 'lawyer'" :model="lawyer" :label-col="labelCol" :wrapper-col="wrapperCol">
          <a-form-item label="First Name">
            <a-input v-model:value="lawyer.firstName" />
          </a-form-item>
          <a-form-item label="Last Name">
            <a-input v-model:value="lawyer.lastName" />
          </a-form-item>
          <a-form-item label="Email">
            <a-input v-model:value="lawyer.email" />
          </a-form-item>
          <a-form-item label="District">
            <a-input v-model:value="lawyer.district" />
          </a-form-item>
          <a-form-item label="University">
            <a-input v-model:value="lawyer.university" />
          </a-form-item>
          <a-form-item label="Username">
            <a-input v-model:value="lawyer.username" />
          </a-form-item>
          <a-form-item label="Password">
            <a-input-password v-model:value="lawyer.password" placeholder="input password" />
          </a-form-item>
          <a-form-item :style="{ justifyContent: 'center', textAlign: 'center' }">
            <a-button type="primary" @click="registerLawyer">Register</a-button>
          </a-form-item>
        </a-form>
      </a-card>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
import { useStore } from "vuex";
import { message } from "ant-design-vue";
import Customer from "@/user-profile/models/customer";
import Lawyer from "@/user-profile/models/lawyer";
import User from "@/user-profile/models/user";
import { useRouter } from "vue-router";

export default {
  name: "log-in",
  components: {
    UserOutlined,
    LockOutlined,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const isLogin = ref(true);
    const typeUser = ref("customer");
    const customer = ref(new Customer("", "", "", "", "", "", ""));
    const lawyer = ref(new Lawyer("", "", "", "", "", "", "", 0, 0, 0, 1));
    const user = ref(new User("", ""));

    const formLogin = reactive({
      username: "",
      password: "",
    });

    const onLogin = () => {
      isLogin.value = true;
    };

    const onSignup = () => {
      isLogin.value = false;
    };

    const login = () => {
      store.dispatch("auth/login", user.value).then(
        () => {
          router.push({ name: "Home" });
          message.success("Login successful.");
          let id = store.state.auth.user.id;
          store.dispatch("lawyer/getLawyers");
          console.log("aaa" + store.state.auth.user.userType);
          if (store.state.auth.user.userType === "Customer") {
            store.dispatch("customer/getLegalAdvices", id);
            store.dispatch("customer/getCustomCases", id);
          } else {
            store.dispatch("lawyer/getLegalAdvices", id);
            store.dispatch("lawyer/getCustomCases", id);
          }
        },
        (error) => {
          console.log(error);
          message.error("Error login.");
        }
      );
    };

    const registerCustomer = () => {
      store.dispatch("customer/register", customer.value).then(
        (response) => {
          store.commit("auth/registerSuccess");
          console.log(response);
          message.success(response.data.message);
          onLogin();
        },
        (error) => {
          store.commit("auth/registerFailure");
          console.log(error);
        }
      );
    };

    const registerLawyer = () => {
      store.dispatch("lawyer/register", lawyer.value).then(
        (response) => {
          store.commit("auth/registerSuccess");
          console.log(response);
          message.success(response.data.message);
          onLogin();
        },
        (error) => {
          store.commit("auth/registerFailure");
          console.log(error);
        }
      );
    };

    return {
      isLogin,
      onLogin,
      onSignup,
      registerCustomer,
      registerLawyer,
      login,
      customer,
      lawyer,
      user,
      formLogin,
      typeUser,
      labelCol: {
        span: 7,
      },
      wrapperCol: {
        span: 16,
      },
    };
  },
};
</script>

<style scoped></style>

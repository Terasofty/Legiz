import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/",
    redirect: Home,
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Log-In"),
  },
  {
    path: "/signup",
    name: "signup",
  },
  {
    path: "/main",
    name: "Main",
    component: () => import("../views/Main"),
  },
  {
    path: "/main/legaladvice",
    name: "LegalAdvices",
    component: () => import("../legalAdvices/pages/LegalAdvice"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;

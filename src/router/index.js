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
  {
    path: "/casos-personalizados",
    name: "CustomCases",
    component: () => import("../customCases/pages/CustomCases"),
  },
  {
    path: "/Legal-service-history",
    name: "LegalServiceHistory",
    component: () => import("../legalServiceHistory/pages/LegalServiceHistory"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;

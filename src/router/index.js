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
    path: "/custom-cases",
    name: "CustomCases",
    component: () => import("../custom-cases/pages/custom-cases"),
  },
  {
    path: "/legal-service-history",
    name: "LegalServiceHistory",
    component: () => import("../legalServiceHistory/pages/LegalServiceHistory"),
  },
  {
    path: "/case-information",
    name: "CaseInformation",
    component: () => import("../case-information/pages/case-information"),
  },
  {
    path: "/search-lawyer",
    name: "SearchLawyer",
    component: () => import("../search-lawyer/pages/container-lawyers")
  },

  
  {
    path: "/lawyers/:id",
    component: () => import("../lawyer/pages/lawyer-profile"),
    children: [
      {
        path: "scores",
        name: "scores",
        component: () => import("../lawyer/pages/scores"),
      },
      {
        path: "employment-history",
        name: "EmploymentHistory",
        component: () => import("../lawyer/pages/employment-history"),
      },
    ],
  },
];


const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;

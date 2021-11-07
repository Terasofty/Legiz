import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/home.vue";
import store from "../store";
import LogIn from "@/views/log-In";
import LogOut from "@/views/log-out";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Base",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "LogIn",
    component: LogIn,
  },
  {
    path: "/logout",
    name: "logout",
    component: LogOut,
    meta: { requiresAuth: true },
  },
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { requiresAuth: true },
  },
  {
    path: "/case-information",
    name: "CaseInformation",
    component: () => import(/* webpackChunkName: "case-information" */ "@/law/case-information/pages/case-information"),
    meta: { requiresAuth: true },
  },
  {
    path: "/search-lawyer",
    name: "SearchLawyer",
    component: () => import(/* webpackChunkName: "search-lawyer" */ "@/user-profile/lawyer/pages/lawyers"),
    meta: { requiresAuth: true },
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import(/* webpackChunkName: "profile" */ "@/user-profile/common/pages/profile"),
    meta: { requiresAuth: true },
    children: [
      {
        path: "legal-advices",
        name: "LegalAdvices",
        component: () => import(/* webpackChunkName: "legal-advices" */ "@/law/legal-advices/pages/legal-advices"),
      },
      {
        path: "custom-cases",
        name: "CustomCases",
        component: () => import(/* webpackChunkName: "custom-cases" */ "@/law/custom-cases/pages/custom-cases"),
      },
    ],
  },
  {
    path: "/lawyer-profile",
    name: "LawyerProfile",
    component: () => import(/* webpackChunkName: "profile" */ "@/user-profile/lawyer/pages/lawyer-profile"),
    meta: { requiresAuth: true },
    children: [
      {
        path: "legal-advices",
        name: "LegalAdvicesProfile",
        component: () => import(/* webpackChunkName: "legal-advices" */ "@/law/legal-advices/pages/legal-advices"),
      },
      {
        path: "custom-cases",
        name: "CustomCasesProfile",
        component: () => import(/* webpackChunkName: "custom-cases" */ "@/law/custom-cases/pages/custom-cases"),
      },
    ],
  },
  {
    path: "/about",
    name: "About",
    component: () => import(/* webpackChunkName: "about" */ "@/views/about"),
    meta: { requiresAuth: true },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.getters["logIn/loggedIn"]) {
      next({
        name: "LogIn",
      });
    } else {
      next();
    }
  } else {
    next(); // make sure to always call next()!
  }
});

export default router;

import { createRouter, createWebHistory } from "vue-router";
import Home from "@/shared/views/home.vue";
import store from "../store";

const About = () => import(/* webpackChunkName: "About" */ "@/shared/views/about");
const Login = () => import(/* webpackChunkName: "Login" */ "@/shared/views/log-in");
const Profile = () => import(/* webpackChunkName: "Profile" */ "@/user-profile/views/profile-container");
const Lawyers = () => import(/* webpackChunkName: "about" */ "@/networking-bc/views/lawyers-container");

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: { requiresAuth: true },
  },
  {
    path: "/lawyers",
    name: "Lawyers",
    component: Lawyers,
    meta: { requiresAuth: true },
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.state.auth.status.loggedIn) {
      next({
        name: "Login",
      });
    } else {
      next();
    }
  } else {
    next(); // make sure to always call next()!
  }
});

export default router;

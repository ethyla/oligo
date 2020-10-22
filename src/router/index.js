import Vue from "vue";
import VueRouter from "vue-router";
import Uni from "../views/Uni";
import Compound from "../views/Compound";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/uni",
  },
  {
    path: "/uni",
    name: "Uni",
    component: Uni,
  },
  {
    path: "/compound",
    name: "Compound",
    component: Compound,
  },
];

const router = new VueRouter({
  routes,
});

export default router;

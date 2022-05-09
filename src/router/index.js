import Vue from "vue";
import VueRouter from "vue-router";
import users from "../components/User/users.vue";
import departments from "../components/Department/departments.vue";
import roles from "../components/Role/roles.vue";
import domaineGroupe from "../components/Domaine_groupe/domaineGroupe.vue";
import damageType from "../components/damage_Type/damageType.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/user",
    name: "user",
    component: users,

    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
  },
  {
    path: "/Departement",
    name: "Departement",
    component: departments,

    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
  },
  {
    path: "/Role",
    name: "Role",
    component: roles,

    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
  },
  {
    path: "/domaineGroupe",
    name: "domaineGroupe",
    component: domaineGroupe,

    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
  },
  {
    path: "/damageType",
    name: "damageType",
    component: damageType,

    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
  },
];
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;

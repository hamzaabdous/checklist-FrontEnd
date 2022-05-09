import Vue from "vue";
import Vuex from "vuex";
import usersModule from "./models/userModule";
import departementModule from "./models/departementModule";
import rolesModule from "./models/roleModule";
import domaineGroupeModule from "./models/domaineGroupeModule";
import damageTypeModule from "./models/damageTypeModule";
Vue.use(Vuex);

let store = null;
export default function () {
  store = new Vuex.Store({
    modules: {
      usersModule,
      departementModule,
      rolesModule,
      domaineGroupeModule,
      damageTypeModule,
    },
    state: {},
    mutations: {},
    actions: {},
    getters: {},
    plugins: [],
  });
  return store;
}
export { store };

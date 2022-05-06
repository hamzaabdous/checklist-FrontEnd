import CustomizedAxios from "../../plugins/axios";

const departementModule = {
  state: {
    departements: [],
  },
  mutations: {
    SET_DEPARTEMENTS(state, departements) {
      state.departements = departements;
    },
    ADD_DEPARTEMENT(state, departements) {
      state.departements.push(departements);
    },
    DELETE_DEPARTEMENT(state, id) {
      state.departements = state.departements.filter((c) => c.id != id);
    },
    EDIT_DEPARTEMENT(state, departements) {
      state.departements = state.departements.map((c) => {
        if (c.id == departements.id) return departements;
        return c;
      });
    },
  },
  actions: {
    setDepartementsAction({ commit }) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.get("departements/")
          .then((response) => {
            commit("SET_DEPARTEMENTS", response.data);
            console.log("set department 1");
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    addDepartementAction({ commit }, departements) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("departements/add", {
          id: departements.id,
          name: departements.name,
        })
          .then((response) => {
            console.log("res add ", response);
            commit("ADD_DEPARTEMENT", response.data);
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    deleteDepartementAction({ commit }, id) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("departements/delete/" + id)
          .then((response) => {
            commit("DELETE_DEPARTEMENT", id);
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    editDepartementAction({ commit }, departements) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.put("/departements/update", {
          id: departements.id,
          name: departements.name,
        })
          .then((response) => {
            commit("EDIT_DEPARTEMENT", response.data);
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
  getters: {
    getdepartements: (state) => {
      return state.departements;
    },
  },
};
export default departementModule;

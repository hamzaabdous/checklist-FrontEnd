import CustomizedAxios from "../../plugins/axios";

const domaineGroupeModule = {
  state: {
    domaineGroupes: [],
  },
  mutations: {
    SET_DOMAINEGROUPES(state, domaineGroupes) {
      state.domaineGroupes = domaineGroupes;
    },
    ADD_DOMAINEGROUPE(state, domaineGroupes) {
      state.domaineGroupes.push(domaineGroupes);
    },
    DELETE_DOMAINEGROUPE(state, id) {
      state.domaineGroupes = state.domaineGroupes.filter((c) => c.id != id);
    },
    EDIT_DOMAINEGROUPE(state, domaineGroupes) {
      state.domaineGroupes = state.domaineGroupes.map((c) => {
        if (c.id == domaineGroupes.id) return domaineGroupes;
        return c;
      });
    },
  },
  actions: {
    setDOMAINEGROUPESAction({ commit }) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.get("groupes/")
          .then((response) => {
            commit("SET_DOMAINEGROUPES", response.data);
            console.log("set domaineGroupes ");
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    addDOMAINEGROUPEAction({ commit }, domaineGroupes) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("groupes/add", {
          id: domaineGroupes.id,
          name: domaineGroupes.name,
          departement: domaineGroupes.departement,
          domaine: {
            id: domaineGroupes.domaine.id,
          },
        })
          .then((response) => {
            console.log("res add ", response);
            commit("ADD_DOMAINEGROUPE", response.data);
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    deleteDOMAINEGROUPEAction({ commit }, id) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("groupes/delete/" + id)
          .then((response) => {
            commit("DELETE_DOMAINEGROUPE", id);
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    editDOMAINEGROUPEAction({ commit }, domaineGroupes) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.put("/groupes/update", {
          id: domaineGroupes.id,
          name: domaineGroupes.name,
          departement: domaineGroupes.departement,
          domaine: {
            id: domaineGroupes.domaine.id,
          },
        })
          .then((response) => {
            commit("EDIT_DOMAINEGROUPE", response.data);
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
  getters: {
    getdomaineGroupes: (state) => {
      return state.domaineGroupes;
    },
  },
};
export default domaineGroupeModule;

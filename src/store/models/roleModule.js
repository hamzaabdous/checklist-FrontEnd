import CustomizedAxios from "../../plugins/axios";

const rolesModule = {
  state: {
    roles: [],
  },
  mutations: {
    SET_ROLES(state, roles) {
      state.roles = roles;
    },
    ADD_ROLE(state, ROLE) {
      state.roles.push(ROLE);
    },
    DELETE_ROLE(state, id) {
      state.roles = state.roles.filter((c) => c.id != id);
    },
    EDIT_ROLE(state, ROLE) {
      state.roles = state.roles.map((c) => {
        if (c.id == ROLE.id) return ROLE;
        return c;
      });
    },
  },
  actions: {
    setRolesAction({ commit }) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.get("roles/")
          .then((response) => {
            commit("SET_ROLES", response.data);
            console.log("set ROLE 1");
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    addRoleAction({ commit }, ROLE) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("roles/add", {
          id: ROLE.id,
          name: ROLE.name,
          departement: {
            id: ROLE.departement.id,
          },
        })
          .then((response) => {
            console.log("res add ", response);
            commit("ADD_ROLE", response.data);
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    deleteRoleAction({ commit }, id) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("roles/delete/" + id)
          .then((response) => {
            commit("DELETE_ROLE", id);
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    editRoleAction({ commit }, ROLE) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.put("/roles/update", {
          id: ROLE.id,
          name: ROLE.name,
          departement: {
            id: ROLE.departement.id,
          },
        })
          .then((response) => {
            commit("EDIT_ROLE", response.data);
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
  getters: {
    getroles: (state) => {
      return state.roles;
    },
  },
};
export default rolesModule;

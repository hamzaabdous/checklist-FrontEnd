import axios from "axios";
const CustomizedAxios = axios;
CustomizedAxios.defaults.baseURL = "http://localhost:8080/";
//var token;
/* if (localStorage.cache) {
  token = JSON.parse(localStorage.cache);
  CustomizedAxios.defaults.headers.common["Accept"] = "application/json";
  CustomizedAxios.defaults.headers.common = {
    Authorization: `Bearer ${token.utilisateurModule.token}`,
    Accept: "application/json",
  };
} */
const token =
  "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJoYW16YSIsImV4cCI6MTY1MjE4NzExNSwiaWF0IjoxNjUyMTY5MTE1fQ.N_iSPcVSWBRE8jU_dUAXFDVThpCMC6tg9Ccy1H9wuBVW4sgDS5iDe41TJKAdZimlVprYaQvklST1DAArbgPVPA";
/* CustomizedAxios.defaults.headers.common["Accept"] = "application/json";
CustomizedAxios.defaults.headers.common = {
  Authorization: `Bearer ` + token,
}; */
CustomizedAxios.defaults.headers.common["Accept"] = "application/json";
CustomizedAxios.defaults.headers.common = {
  Authorization: `Bearer ${token}`,
  Accept: "application/json",
};
/*
//console.log("store.getters.getCurrentdepartement", this.$store);
/* if (departementModule.state.currentdepartement != null) {
  console.log("departement", departementModule.state.currentdepartement);
  axios.defaults.headers.common = {
    Authorization: `Bearer ${departementModule.state.currentdepartement.token}`,
  };
} */
/*axios.interceptors.request.use(
  function (config) {
    const token = store.getters.getCurrentdepartement.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (err) {
    return Promise.reject(err);
  }
);*/

export default CustomizedAxios;

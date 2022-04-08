import axios from "axios";

const state = {};

const mutations = {};
const apiHost = "/spctechjobpicapi/api";
const actions = {
  checklogin({ state }) {
    return axios.post(
      `${apiHost}/User/postuser`
    );
  },
  registerUser({ state }, data) {
    return axios.post(
      `${apiHost}/User/registeruser`,
      data
    );
  },

  checkUser({ state }, data) {
    return axios.get(
      `${apiHost}/User/checkUser`,
      {
        params: data,
      }
    );
  },
  checkJOB({ state }, data) {
    return axios.get(
      `${apiHost}/User/checkJOB`,
      {
        params: data,
      }
    );
  },
  getJOB({ state }, data) {
    return axios.get(`${apiHost}/User/getJOB`);
  },
  UploadIMG({ state }, data) {
    return axios.post(`${apiHost}/User/UploadIMG`,data,{headers: { "Content-Type":"Multipart/form-data"}});
  },
  
  //ดึงข้อมูลรูปภาพจาก Trans
  getDataTableTrans({state}, data){
    return axios.get(`${apiHost}/ImageTrans/getDataTableTans`,
    {
      params: data,
    })
  },
  getCarMachine({ state }) {
    return axios.get(`${apiHost}/Shop24/getCarMachineJob`);
  },
  getCarMachineById({ state }, data) {
    return axios.get(`${apiHost}/Shop24/getCarMachineJobById`,{
      params: data,
    });
  },
  updateJobHandlift({ state }, data) {
    return axios.post(`${apiHost}/Shop24/updateJobHandlift`,data, {headers: { "Content-Type":"application/json"}});
  },
  closeJobHandlift({ state }, data) {
    return axios.post(`${apiHost}/Shop24/closeJobHandlift`,data, {headers: { "Content-Type":"application/json"}});
  },
};

const getters = {};

export default {
  namespaced: true,
  getters,
  mutations,
  actions,
  state,
  
};

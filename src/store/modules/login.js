import http from '../../api/http'
import qs from 'qs'

const actions = {
  sendEmailApi({ commit }, param) {
    return http.post(`${http.baseUrl}/userLogin/sendCode`, qs.stringify(param)).then(res => {
      return res.data;
    })
  },
  registerApi({ commit }, { payload }) {
    return http.post(`${http.baseUrl}/userLogin/register`, payload, http.JSONHEADER).then(res => {
      return res.data;
    })
  },
  toLoginApi({ commit }, param) {
    return http.post(`${http.baseUrl}/userLogin/login`, qs.stringify(param)).then(res => {
      return res.data;
    })
  },
  getEmailByTokenApi({ commit }, param) {
    return http.post(`${http.baseUrl}/userLogin/getEmailByToken`).then(res => {
      return res.data;
    })
  },
  logoutApi({commit}, param) {
    return http.post(`${http.baseUrl}/userLogin/logout`).then(res => {
      return res.data;
    })
  }
};


export default {
  namespaced: true,
  actions
}

import http from '../../api/http'
import qs from 'qs'

const actions = {
  addTagApi({ commit }, param) {
    return http.post(`${http.baseUrl}/tag/addTag`, param, http.JSONHEADER).then(res => {
      return res.data;
    })
  },
  deleteTagByIdApi({ commit }, payload) {
    return http.post(`${http.baseUrl}/tag/deleteTagById/${payload.id}`).then(res => {
        return res.data;
      })
  },
  updateTagByIdApi({ commit }, payload) {
    return http.post(`${http.baseUrl}/tag/updateTagById`, payload, http.JSONHEADER).then(res => {
        return res.data;
      })
  },
  getTagListByUserApi({ commit }, {payload}) {
    return http.post(`${http.baseUrl}/tag/getTagListByUser`, payload, http.JSONHEADER).then(res => {
        return res.data;
      })
  },
  getAllTagsByUserApi({ commit }, {}) {
    return http.get(`${http.baseUrl}/tag/getAllTagsByUser`).then(res => {
        return res.data;
      })
  }
};


export default {
  namespaced: true,
  actions
}

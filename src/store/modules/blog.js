import http from '../../api/http'
import qs from 'qs'

const actions = {
  uploadImgApi({ commit }, param) {
    return http.post(`${http.baseUrl}/file/uploadImg`, param, http.FILEHEADER).then(res => {
      return res.data;
    })
  },
  insertBlogApi({ commit }, { payload }) {
    return http.post(`${http.baseUrl}/blog/addBlog`, payload, http.JSONHEADER).then(res => {
      return res.data;
    })
  },
  getBlogsByUserApi({ commit }, { payload }) {
    return http.post(`${http.baseUrl}/blog/getBlogsByUser`, payload, http.JSONHEADER).then(res => {
      return res.data;
    })
  },
  getBlogsByIdApi({ commit }, { payload }) {
    return http.post(`${http.baseUrl}/blog/getBlogsById`, qs.stringify(payload)).then(res => {
      return res.data;
    })
  },
  getBlogsWithUserAndPageApi({ commit }, { payload }) {
    return http.post(`${http.baseUrl}/blog/getBlogsWithUserAndPage`, payload, http.JSONHEADER).then(res => {
      return res.data;
    })
  },
  updateBlogByIdApi({ commit }, { payload }) {
    return http.post(`${http.baseUrl}/blog/updateBlogById`, payload, http.JSONHEADER).then(res => {
      return res.data;
    })
  },
  deleteBlogByIdApi({ commit }, { payload }) {
    return http.post(`${http.baseUrl}/blog/deleteBlogById/${payload.id}`).then(res => {
      return res.data;
    })
  }
};


export default {
  namespaced: true,
  actions
}

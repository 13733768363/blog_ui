import axios from 'axios'
import ElementUI from 'element-ui';

const FORMHEADER =  {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    'Authorization': localStorage.getItem('token')
};

const FILEHEADER = {
    'Content-Type': 'multipart/form-data',
    'Authorization': localStorage.getItem('token')
};

const JSONHEADER = {
    'Content-Type': 'application/json;charset=UTF-8',
    'Authorization': localStorage.getItem('token')
};


const baseUrl = 'http://114.115.140.191:8080';

export default {
    get(url, param) {
        const get = axios.create({
            baseURL: baseUrl,
            headers: {'Authorization': localStorage.getItem('token')},
            method: "get",
            timeout: 20000,
        });
        return get({
            url: url,
            data: param
        });
    },

    post(url, param, header) {
        if (!header || header == null) {
            header = {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                'Authorization': localStorage.getItem('token')
            };
        }
        const post = axios.create({
            baseURL: baseUrl,
            method: "post",
            headers: header,
            timeout: 20000
        })
        return post({
            url: url,
            data: param,
        }).catch(()=>{
            ElementUI.Message.error('出错了');
        });
    },

    FORMHEADER,
    FILEHEADER,
    JSONHEADER,
    baseUrl
}
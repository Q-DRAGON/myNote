import axios from 'axios';
import Vue from 'vue'
import qs from 'qs'
import store from '@/store'
import { getToken } from '@/utils/auth'

let loadingInstance = null
let rootApp = Vue.prototype

function handleSuccess(res) {
  if (loadingInstance) {
    rootApp.$nextTick(() => loadingInstance.close())
  }
  return res.data;
}

function handleError(err) {
  if (loadingInstance) {
    rootApp.$nextTick(() => loadingInstance.close())
  }
  rootApp.$message.error({
    message: '网络请求错误, 稍后重试',
    duration: 2000,
  });
  // console.log('error', err)
  return Promise.reject(err)
}


axios.defaults.timeout = 2000
axios.defaults.baseURL = `${process.env.VUE_APP_BASE_API}`;
// axios.defaults.baseURL = `http://localhost:8010`;
// axios.defaults.baseURL = `api`;
// console.log('baseurl', process.env);
// axios.defaults.headers.post['Content-type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
/*
* content-type:
* 类型一application/x-www-form-urlencode 默认是form表单数据提交格式
* 类型二multipart/form-data 上传文件格式
* 类型三application/json  {"title":"test","sub":[1,2,3]} 的格式 特别适合 RESTful 的接口
* 类型四text/xml 它是一种使用 HTTP 作为传输协议，XML 作为编码方式的远程调用规范。
*
* 注意：
* 默认情况下，axios将JavaScript对象序列化为JSON。 要以application / x-www-form-urlencoded格式发送数据，您可以使用以下选项之一。
import qs from 'qs';
const data = { 'bar': 123 };
const options = {
  method: 'POST',
  headers: { 'content-type': 'application/x-www-form-urlencoded' },
  data: qs.stringify(data),
  url,
};
axios(options);
const querystring = require('querystring');
axios.post('http://something.com/', querystring.stringify({ foo: 'bar' }));
* */


axios.interceptors.request.use((config) => {
  // Do something before request is sent
  if (store.getters.token) {
    config.headers['Authorization'] = getToken()
  }
  return config
}, (error) => {
  // Do something with request error
  return Promise.reject(error)
})


axios.interceptors.response.use((response) => {
  // Do something before response is sent
  return response
}, (error) => {
  // Do something with response error
  return Promise.reject(error)
})


const get = (url, params, config={}) => {
  return axios['get'](url, {
    params,
    headers: config,
  }).then(handleSuccess)
    .catch(handleError)
}

const getl = (url, params, config) => {
  loadingInstance = rootApp.$loading({fullscreen: true})
  return get(url, params, config)
}

const post = (url, data, config={}) => {
  let contentType = undefined
  if (config) {
    contentType = config['Content-Type']
  }
  // log(`post config: config is ${config}, contenttype is ${contentType}`);
  // log('post request', url, data, axios.defaults.baseURL)
  return axios({
    method: 'post',
    url,
    data: contentType ? qs.stringify(data) : data,
    headers: config,
  }).then(handleSuccess)
    .catch(handleError)
}

const postl = (url, data, config) => {
  loadingInstance = rootApp.$loading({fullscreen: true})
  return post(url, data, config)
}

const posts = (url, data, config={}) => {
  let query = (Object.entries(data).map(item => {
    return item.join('=')
  })).join('&');
  let ul = url + "?" + query;
  return axios({
    method: 'post',
    url: ul,
    headers: config,
  }).then(handleSuccess)
    .catch(handleError)
}

const httb = {
  get,
  getl,
  post,
  postl,
  posts,
}


export default httb

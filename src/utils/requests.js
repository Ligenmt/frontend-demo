import axios from 'axios'
import { Message, MessageBox } from 'element-ui'


// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  headers: {
    token: "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOlsiMSIsImI4ZDBkNjM2NmM3NDQ4M2FiZWVlMGNjZTE4NGYzNWY5IiwiMTU2MDIyNjY1MTYwNyJdfQ.YpU7x9XWjbM8yvU-_HYbpfclpxoIdMO2C6SLrL0crTA",
  },
  timeout: 15000, // 请求超时时间
})

// service.interceptors.request.use(config => {
//   if (store.getters.token) {
//     config.headers['Authorization'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
//   }
//   return config
// }, error => {
//   // Do something with request error
//   console.log(error) // for debug
//   Promise.reject(error)
// })
export default service

import axios from 'axios'
import store from '@/store'
import { notification } from 'antd'
import storage from 'redux-persist/lib/storage'

const service = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 60000,
})

service.interceptors.request.use(
  config => {
    config.headers['X-Access-Token'] = store.getState().user.token
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    if (response.data.code === 200) {
      return response.data.data
    } else if (response.data.code === 920) {
      storage.removeItem('persist:root')
      window.location.reload(true)
    } else {
      notification.error({
        message: `错误码: ${response.data.code ?? -1}`,
        description: response.data.detail ?? '服务器出小差'
      })
    }
  }
)

export default service

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import '@/assets/styles/index.scss'
import 'antd/dist/antd.css'
import App from '@/App'
import store from '@/store'
import reportWebVitals from './reportWebVitals'
import { ConfigProvider } from 'antd'
import moment from 'moment'
import zhCN from 'antd/lib/locale-provider/zh_CN'
import 'moment/locale/zh-cn' // 解决 antd 日期组件国际化问题

// 设置语言
moment.locale('zh-cn')

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider locale={zhCN}>
        <Router>
          <App />
        </Router>
      </ConfigProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

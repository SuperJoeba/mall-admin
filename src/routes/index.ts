import loadable from '@loadable/component'
import IRouteProps from './types'
import {
  HomeOutlined,
  ClockCircleOutlined,
  FileDoneOutlined,
  ScheduleOutlined,
  BarChartOutlined,
  FormOutlined,
  UserOutlined
} from '@ant-design/icons'


const Login = loadable(() => import('@/views/login'))
const Layout = loadable(() => import('@/layout'))
const Dashboard = loadable(() => import('@/views/dashboard'))

export const baseRoutes:IRouteProps[] = [
  {
    path: ['/', '/login'],
    exact: true,
    component: Login,
    meta: {
      title: '登录'
    }
  }
]

export const asyncRoutes:IRouteProps[] = [
  {
    path: '/layout',
    component: Layout,
    childRoutes: [
      {
        path: '/layout/dashboard',
        component: Dashboard,
        exact: true,
        meta: {
          title: '数据面板',
          icon: HomeOutlined
        }
      }
    ]
  }
]

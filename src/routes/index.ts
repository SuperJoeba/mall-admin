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
const LayoutView = loadable(() => import('@/layout'))
const Dashboard = loadable(() => import('@/views/dashboard'))
const System = loadable(() => import('@/views/system'))

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
    component: LayoutView,
    childRoutes: [
      {
        path: ['/layout', '/layout/dashboard'],
        component: Dashboard,
        exact: true,
        meta: {
          title: '数据面板',
          icon: HomeOutlined
        }
      },
      {
        path: '/layout/system',
        component: System,
        exact: true,
        meta: {
          title: '系统管理',
          icon: ClockCircleOutlined
        }
      }
    ]
  }
]

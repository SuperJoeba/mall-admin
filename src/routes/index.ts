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
const User = loadable(() => import('@/views/system/user'))
const Role = loadable(() => import('@/views/system/role'))
const Route = loadable(() => import('@/views/system/route'))
const Exception = loadable(() => import('@/views/exception'))

export const baseRoutes:IRouteProps[] = [
  {
    name: '加载中',
    path: '/',
    exact: true,
    component: Login,
    id: 0
  },
  {
    name: '登录',
    path: '/login',
    exact: true,
    component: Login,
    id: 0
  },
  {
    name: 'Layout',
    path: '/layout',
    component: LayoutView,
    children: [],
    id: 0
  }
]

export const asyncRoutes:IRouteProps[] = [
  {
    name: '数据面板',
    path: '/layout/dashboard',
    component: Dashboard,
    exact: true,
    icon: 'HomeOutlined',
    id: 1,
    pid: 0,
    keepAlive: false
  },
  {
    name: '系统管理',
    path: '/layout/system',
    component: Exception,
    exact: true,
    icon: 'ClockCircleOutlined',
    id: 2,
    pid: 0,
    keepAlive: false
  },
  {
    name: '用户管理',
    path: '/layout/system/user',
    component: User,
    exact: true,
    icon: 'ClockCircleOutlined',
    id: 20,
    pid: 2,
    keepAlive: true,
  },
  {
    name: '角色管理',
    path: '/layout/system/role',
    component: Role,
    exact: true,
    icon: 'HomeOutlined',
    id: 21,
    pid: 2,
    keepAlive: false
  },
  {
    name: '路由管理',
    path: '/layout/system/route',
    component: Route,
    exact: true,
    icon: 'HomeOutlined',
    id: 22,
    pid: 2,
    keepAlive: false
  },
  {
    name: 'Exception',
    path: '*',
    component: Exception,
    id: 0
  }
]

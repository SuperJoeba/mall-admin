import IRouteProps from './types'
import Login from '@/views/login'

const baseRoutes:IRouteProps[] = [
  {
    path: ['/', '/login'],
    exact: true,
    component: Login,
    meta: {
      title: '登录'
    }
  }
]

const asyncRoutes:IRouteProps[] = [

]

const routesConfig:IRouteProps[] = [...baseRoutes, ...asyncRoutes]

export default routesConfig

import { ROUTE } from '../constants'
import { GetUserAuthorities } from '@/api'
import IRouteProps from '@/routes/types'
import { Dispatch } from 'redux'
import { baseRoutes } from '@/routes'
import { mapResToRouter } from '@/utils'

const { SETROUTE, SETASYNCROUTE } = ROUTE

export const setRoutes = (routes:IRouteProps[]) => {

  baseRoutes[baseRoutes.length - 1].children = mapResToRouter(routes.filter(item => item.type === 1))

  return {
    type: SETROUTE,
    routes: baseRoutes
  }
}

export const setAsyncRoutes = (routes:IRouteProps[]) => {
  return {
    type: SETASYNCROUTE,
    routes: routes
  }
}

export const getUserAuthorities = () => async(dispatch:Dispatch) => {
  try {
    const result = await GetUserAuthorities()
    const routes = result.list
    return dispatch(setAsyncRoutes(routes))
  } catch (error) {
    return dispatch(setAsyncRoutes([]))
  }
}

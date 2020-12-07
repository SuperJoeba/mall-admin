import { ROUTE } from '../constants'
import { Dispatch } from 'redux'
import { GetRoutes } from '@/api'
import IRouteProps from '@/routes/types'
import { asyncRoutes } from '@/routes'

const { SETROUTE } = ROUTE

export const setRoutes = () => {
  return {
    type: SETROUTE,
    routes: asyncRoutes
  }
}



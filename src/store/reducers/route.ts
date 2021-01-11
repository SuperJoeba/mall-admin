import IRouteProps from '@/routes/types'
import { ROUTE } from '../constants'
import { baseRoutes } from '@/routes'
import { stat } from 'fs'

const { SETROUTE, SETASYNCROUTE } = ROUTE

export interface IRouteState {
  routes:IRouteProps[],
  asyncRoutes: IRouteProps[]
}

const initialState:IRouteState = {
  routes: [...baseRoutes],
  asyncRoutes: []
}

const route = (state = initialState, action: any) => {
  switch (action.type) {
    case SETROUTE:
      console.log(action.routes)
      return Object.assign({}, state, {
        routes: action.routes
      })
    case SETASYNCROUTE:
      return Object.assign({}, state, {
        asyncRoutes: action.routes
      })
    default:
      return state
  }
}

export default route

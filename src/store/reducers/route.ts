import IRouteProps from '@/routes/types'
import { ROUTE } from '../constants'
import { baseRoutes } from '@/routes'

const { SETROUTE } = ROUTE

export interface IRouteState {
  routes:IRouteProps[]
}

const initialState:IRouteState = {
  routes: baseRoutes
}

const route = (state = initialState, action: any) => {
  switch (action.type) {
    case SETROUTE:
      return Object.assign({}, state, {
        routes: [...state.routes, ...action.routes]
      })
    default:
      return state
  }
}

export default route

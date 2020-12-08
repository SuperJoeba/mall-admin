import React, { useEffect } from 'react'
import { connect, DispatchProp } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { Switch, useLocation, useHistory } from 'react-router-dom'
import RouteItem from '@/components/route-item'
import { IStoreState } from '@/store'
import { AnyAction } from 'redux'
import IRouteProps from '@/routes/types'
import { setRoutes } from '@/store/actions'
import { baseRoutes } from '@/routes'

type ThunkDispatchProps = ThunkDispatch<{}, {}, AnyAction>
type Props = IRouteProps & {
    dispatch: ThunkDispatchProps
  } & DispatchProp & ReturnType<typeof mapStateToProps>

const App: React.FC<Props> = ({ routes, token, dispatch }) => {
  let location = useLocation()
  let history = useHistory()

  useEffect(() => {
    const pathname = location.pathname
    const baseRoute = baseRoutes.filter(item => item.path === pathname || item.path.includes(pathname))
    if (baseRoute.length) {
      if (token) {
        if (routes.length <= baseRoutes.length) {
          dispatch(setRoutes())
        }
        history.replace('/layout/dashboard')
      }
    } else {
      if (token) {
        if (routes.length <= baseRoutes.length) {
          dispatch(setRoutes())
        }
      } else {
        history.replace('/', location)
      }
    }
  }, [location.pathname])

  return (
    <Switch>
      {
        routes.map((route, i) => (
          <RouteItem {...route} key={i}/>
        ))
      }
    </Switch>
  )
}

const mapStateToProps = ({ route, user }:IStoreState) => {
  return { routes: route.routes, token: user.token }
}

export default connect(mapStateToProps)(App)

import React, { useEffect } from 'react'
import { connect, DispatchProp } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { Switch, Redirect, useLocation, useHistory } from 'react-router-dom'
import CONFIG from '@/config'
import RouteItem from '@/components/route-item'
import { IStoreState } from '@/store'
import { AnyAction } from 'redux'
import IRouteProps from '@/routes/types'
import { setRoutes } from '@/store/actions'

type ThunkDispatchProps = ThunkDispatch<{}, {}, AnyAction>
type Props = IRouteProps & {
    dispatch: ThunkDispatchProps
  } & DispatchProp & ReturnType<typeof mapStateToProps>

const App: React.FC<Props> = ({ routes, token, dispatch }) => {
  let location = useLocation()
  let history = useHistory()

  useEffect(() => {
    const pathname = location.pathname
    console.log(pathname)
    const baseRoute = routes.filter(item => item.path === pathname || item.path.includes(pathname))
    if (!baseRoute.length) {
      if (token) {
        dispatch(setRoutes())
      } else {
        history.replace('/')
      }
    }
  }, [location])

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

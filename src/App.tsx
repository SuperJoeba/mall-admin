import React, { useState, useEffect } from 'react'
import { connect, DispatchProp } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { Switch, useHistory } from 'react-router-dom'
import PrivateRoute from '@/components/private-route'
import { IStoreState } from '@/store'
import IRouteProps from '@/routes/types'
import { getUserAuthorities, setRoutes } from '@/store/actions'

type ThunkDispatchProps = ThunkDispatch<{}, {}, AnyAction>
type Props = IRouteProps & ReturnType<typeof mapStateToProps> & DispatchProp & {
  dispatch: ThunkDispatchProps
}

const App: React.FC<Props> = ({ token, routes, asyncRoutes, dispatch }) => {

  // useEffect(() => {
  //   if (!asyncRoutes.length) {
  //     dispatch(getUserAuthorities()).then((res) => {
  //       dispatch(setRoutes(res.routes))
  //     })
  //   }
  // }, [token])

  return (
    <Switch>
      {
        routes.map((route, i) => {
          return (<PrivateRoute {...route} key={i}/>)
        })
      }
    </Switch>
  )
}

const mapStateToProps = ({ route, user }:IStoreState) => {
  return { token: user.token, routes: route.routes, asyncRoutes: route.asyncRoutes }
}

export default connect(mapStateToProps)(App)

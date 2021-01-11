import React from 'react'
import IRouteProps from '@/routes/types'
import { Route, Redirect, RouteComponentProps } from 'react-router-dom'
import { connect, DispatchProp } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { IStoreState } from '@/store'
import { getUserAuthorities, setRoutes } from '@/store/actions'

type ThunkDispatchProps = ThunkDispatch<{}, {}, AnyAction>
type Props = IRouteProps & ReturnType<typeof mapStateToProps> & RouteComponentProps & DispatchProp & {
  dispatch: ThunkDispatchProps
}

const PrivateRoute:React.FC<Props> = ({
  name, children, component:Component, token, asyncRoutes, dispatch, ...rest
}) => {
  document.title = name || ''

  return (
    <Route {...rest} render={props => {
      const pathname = props.location.pathname
      const search = props.location.search
      const state:any = props.location.state

      if (pathname === '/login' || pathname === '/') {
        if (token) {
          if (!asyncRoutes.length) {
            dispatch(getUserAuthorities()).then((res) => {
              dispatch(setRoutes(res.routes))
              return <Redirect to={{pathname: state || '/layout/dashboard' }}/>
            })
          } else {
            return <Redirect to={{pathname: state || '/layout/dashboard' }}/>
          }
        }
      } else {
        if (!token) {
          props.history.replace(`/login`, `${pathname}${search}`)
        } else {
          if (!asyncRoutes.length) {
            dispatch(getUserAuthorities()).then((res) => {
              dispatch(setRoutes(res.routes))
            })
          }
        }
      }
      return (<Component {...props} routes={children} />)
    }
    } />
  )
}

const mapStateToProps = ({ route, user }:IStoreState) => {
  return { token: user.token, asyncRoutes: route.asyncRoutes }
}

export default connect(mapStateToProps)(PrivateRoute)

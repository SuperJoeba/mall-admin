import React from 'react'
import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { connect, DispatchProp } from 'react-redux'
import IRouteProps from '@/routes/types'
import { IStoreState } from '@/store'
import { Switch, Route, Redirect, withRouter, RouteComponentProps } from 'react-router-dom'
import { setLoading, getMenus } from '@/store/actions'

type ThunkDispatchProps = ThunkDispatch<{}, {}, AnyAction>
type Props = IRouteProps & ReturnType<typeof mapStateToProps> & {
    dispatch: ThunkDispatchProps
  } &DispatchProp & RouteComponentProps

const RouteItem:React.FC<Props> = ({
  component: Component,
  children,
  location,
  token,
  dispatch,
  ...rest
}) => {
  if (token) {
    dispatch(getMenus())
  } else {
    // dispatch(setLoading(false))
    return <Redirect to={{
      pathname: '/',
      search: `?redirectUrl=${location.pathname}`
    }} />
  }
  return (
    <Route render={
      props => {
        return (
          <Component {...props} {...rest}>
            {
              Array.isArray(children) ? children.map((route, index) => (
                <RouteItemComponent {...route} key={index} />
              )) : null
            }
          </Component>
        )
      }
    }></Route>
  )
}

const mapStateToProps = (state: IStoreState) => {
  return {
    token: state.user.token
  }
}

export const RouteItemComponent = connect(mapStateToProps)(withRouter(RouteItem))

export default RouteItemComponent

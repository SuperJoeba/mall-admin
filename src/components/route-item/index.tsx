import React from 'react'
import IRouteProps from '@/routes/types'
import { Route } from 'react-router-dom'
import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { connect, DispatchProp } from 'react-redux'
import { setLoading, getMenus } from '@/store/actions'

type ThunkDispatchProps = ThunkDispatch<{}, {}, AnyAction>
type Props = IRouteProps & {
    dispatch: ThunkDispatchProps
  } & DispatchProp

const RouteItem:React.FC<Props> = ({
  path,
  component: Component,
  childRoutes,
  dispatch
}) => {
  setTimeout(() => {
    dispatch(setLoading(false))
  }, 2000)
  return (
    <Route path={path} render={
      props =>
        (<Component {...props} childRoutes={childRoutes}/>)
    } />
  )
}

export default connect()(RouteItem)

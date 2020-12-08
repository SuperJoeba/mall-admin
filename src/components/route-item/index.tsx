import React from 'react'
import IRouteProps from '@/routes/types'
import { Route, useHistory } from 'react-router-dom'
import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { connect, DispatchProp } from 'react-redux'

type ThunkDispatchProps = ThunkDispatch<{}, {}, AnyAction>
type Props = IRouteProps & {
    dispatch: ThunkDispatchProps
  } & DispatchProp

const RouteItem:React.FC<Props> = ({
  path,
  component: Component,
  childRoutes,
  ...rest
}) => {
  const { meta } = rest
  if (meta) {
    document.title = meta.title
  }

  return (
    <Route path={path} render={ props =>
      (<Component {...props} childRoutes={childRoutes}/>)
    } />
  )
}

export default connect()(RouteItem)

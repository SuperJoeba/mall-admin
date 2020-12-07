import React from 'react'
import { Switch, Redirect, RouteComponentProps } from 'react-router-dom'
import { connect, DispatchProp } from 'react-redux'
import RouteItem from '@/components/route-item'
import IRouteProps from '@/routes/types'
import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { IStoreState } from '@/store'

type ThunkDispatchProps = ThunkDispatch<{}, {}, AnyAction>
type Props = IRouteProps & ReturnType<typeof mapStateToProps> & RouteComponentProps & {
    dispatch: ThunkDispatchProps
  } & DispatchProp

const Layout:React.FC<Props> = ({childRoutes, token, location, dispatch}) => {

  return (
    <div>
      <h1>Layout</h1>
      <Switch>
        {
          childRoutes?.map((route, i) => {
            return (<RouteItem key={i} {...route} />)
          })
        }
      </Switch>
    </div>
  )
}

const mapStateToProps = (state: IStoreState) => {
  return {
    token: state.user.token
  }
}

export default connect(mapStateToProps)(Layout)

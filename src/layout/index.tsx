import React, { useState } from 'react'
import { Switch, Link, RouteComponentProps } from 'react-router-dom'
import { connect, DispatchProp } from 'react-redux'
import RouteItem from '@/components/route-item'
import IRouteProps from '@/routes/types'
import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { IStoreState } from '@/store'
import { Layout } from 'antd'
import Sider from './sider'
import Header from './header'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons'
import './index.scss'

const { Content } = Layout

type ThunkDispatchProps = ThunkDispatch<{}, {}, AnyAction>
type Props = IRouteProps & ReturnType<typeof mapStateToProps> & RouteComponentProps & {
    dispatch: ThunkDispatchProps
  } & DispatchProp

export interface LayoutState {
    collapsed?: boolean
    setCollapsed?: () => void
  }

const LayoutView:React.FC<Props> = ({childRoutes, dispatch}) => {
  const [collapsed, setCollapsed] = useState(false)

  const handleToggleCollapsed = () => {
    setCollapsed(!collapsed)
  }
  return (
    <Layout>
      <Sider {...{collapsed}}/>
      <Layout className='site-layout'>
        <Header {...{collapsed, setCollapsed: handleToggleCollapsed}}/>
        <Content
          className='site-layout-background'
          style={{
            margin: 15,
            padding: 20,
          }}
        >
          <Switch>
            {
              childRoutes?.map((route, i) => {
                return (<RouteItem key={i} {...route} />)
              })
            }
          </Switch>
        </Content>
      </Layout>
    </Layout>
  )
}

const mapStateToProps = (state: IStoreState) => {
  return {
    token: state.user.token
  }
}

export default connect(mapStateToProps)(LayoutView)

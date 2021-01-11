import React, { useState } from 'react'
import { Switch, Link, Route, RouteComponentProps } from 'react-router-dom'
import { connect, DispatchProp } from 'react-redux'
import PrivateRoute from '@/components/private-route'
import IRouteProps from '@/routes/types'
import { Layout } from 'antd'
import Sider from './sider'
import Header from './header'
import Tabbar from './tabbar'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons'
import './index.scss'

const { Content } = Layout

export interface LayoutState {
    collapsed?: boolean
    setCollapsed?: () => void,
    tabPanes?: Array<IRouteProps>,
    setTabPanes?: (pane:IRouteProps[]) => void,
    activeKey?:string,
    setActiveKey?: (key: string) => void
  }

const LayoutView:React.FC<IRouteProps> = ({ routes }) => {
  const [collapsed, setCollapsed] = useState(false)
  const [tabPanes, setTabPanes] = useState<Array<IRouteProps>>([])
  const [activeKey, setActiveKey] = useState<string>('')

  const handleToggleCollapsed = () => {
    setCollapsed(!collapsed)
  }
  const handleSetTabPanes = (panes:IRouteProps[]) => {
    setTabPanes(panes)
  }
  const handleSetActiveKey = (key:string) => {
    setActiveKey(key)
  }
  console.log(routes)
  return (
    <Layout>
      <Sider {...{collapsed, tabPanes, setTabPanes: handleSetTabPanes, setActiveKey: handleSetActiveKey,}}/>
      <Layout className='site-layout'>
        <Header {...{collapsed, setCollapsed: handleToggleCollapsed}}/>
        {
          tabPanes.length ? <Tabbar {...{activeKey, setActiveKey: handleSetActiveKey, tabPanes, setTabPanes: handleSetTabPanes}} /> : null
        }
        <Content
          className='site-layout-background'
          style={{padding: 15, margin: 15}}
        >
          <Switch>
            {
              routes.map((route:IRouteProps, i:number) => {
                return (
                  <PrivateRoute {...route} key={i}/>
                )
              })
            }
          </Switch>
        </Content>
      </Layout>
    </Layout>
  )
}

export default LayoutView

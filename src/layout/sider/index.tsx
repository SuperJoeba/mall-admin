import React from 'react'
import { withRouter, RouteComponentProps, Link } from 'react-router-dom'
import './index.scss'
import { Layout, Menu } from 'antd'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons'
import { LayoutState } from '../index'

const { Sider } = Layout

type Props = LayoutState & RouteComponentProps

const SiderView:React.FC<Props> = ({ collapsed }) => {
  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className='logo'>Mall-Admin</div>
      <Menu theme='dark' mode='inline' defaultSelectedKeys={['1']}>
        <Menu.Item key='1' icon={<UserOutlined />}>
          nav 1
        </Menu.Item>
        <Menu.Item key='2' icon={<VideoCameraOutlined />}>
          nav 2
        </Menu.Item>
        <Menu.Item key='3' icon={<UploadOutlined />}>
          nav 3
        </Menu.Item>
      </Menu>
    </Sider>
  )
}

export default withRouter(SiderView)

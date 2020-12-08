import React from 'react'
import { Layout, Avatar, Popover } from 'antd'
import { LayoutState } from '../index'
import { UserOutlined } from '@ant-design/icons'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons'
import './index.scss'

const { Header } = Layout

type Props = LayoutState

const HeaderView:React.FC<Props> = ({ collapsed, setCollapsed }) => {
  return (
    <Header className='layout-header flex-bt'>
      <div>
        {
          collapsed ?
            (<MenuUnfoldOutlined className='trigger' onClick={setCollapsed}/>) :
            (<MenuFoldOutlined className='trigger' onClick={setCollapsed} />)
        }
      </div>
      <div>

      </div>
    </Header>
  )
}

export default HeaderView

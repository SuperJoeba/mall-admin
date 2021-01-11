import React, { useState } from 'react'
import { Layout } from 'antd'
import { LayoutState } from '../index'
import { UserOutlined } from '@ant-design/icons'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  FullscreenExitOutlined,
  FullscreenOutlined
} from '@ant-design/icons'
import './index.scss'
import Avatar from '../avatar'
import { fullScreen, existFullScreen } from '@/utils'

const { Header } = Layout

type Props = LayoutState

const HeaderView:React.FC<Props> = ({ collapsed, setCollapsed }) => {
  const [isFullScreen, setFullScreen] = useState(false)

  const handleFullScreen = () => {
    setFullScreen(isFullScreen => {
      isFullScreen ? existFullScreen() : fullScreen()
      return !isFullScreen
    })
  }
  return (
    <Header className='layout-header flex-bt'>
      <div>
        {
          collapsed ?
            (<MenuUnfoldOutlined className='trigger' onClick={setCollapsed}/>) :
            (<MenuFoldOutlined className='trigger' onClick={setCollapsed} />)
        }
      </div>
      <ul className='system-options flex-center'>
        <li className='flex-center' style={{fontSize: 18}} onClick={handleFullScreen}>
          {
            !isFullScreen ? <FullscreenOutlined /> : <FullscreenExitOutlined />
          }
        </li>
        <Avatar />
      </ul>
    </Header>
  )
}

export default HeaderView

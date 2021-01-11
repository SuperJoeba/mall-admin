import React from 'react'
import { Avatar, Popover } from 'antd'
import { UserOutlined, PoweroffOutlined } from '@ant-design/icons'
import { RouteComponentProps, Link } from 'react-router-dom'
import './index.scss'
import storage from 'redux-persist/lib/storage'
import {IStoreState} from '@/store'
import { connect } from 'react-redux'

const popoverList = [
  { name: '个人信息', path: '/personal' },
  { name: '消息中心', path: '/message' },
  { name: '账户信息', path: '/account' }
]

const logout = () => {
  storage.removeItem('persist:root')
  window.location.reload(true)
}

const PopoverContent = (
  <div className='popover-content'>
    {popoverList.map(el => (
      <Link className='popover-option' to={el.path} key={el.name}>{el.name}</Link>
    ))}
    <div className='popover-option sign-out' onClick={() => logout()}>
      <PoweroffOutlined style={{ fontSize: '14px', marginRight: '5px' }}/>
      退出
    </div>
  </div>
)

type Props = ReturnType<typeof mapStateToProps>

const AvatarView:React.FC<Props> = ({ userInfo }) => {
  return (
    <Popover placement='bottomRight' content={PopoverContent}>
      <li className='flex-center'>
        <Avatar icon={<UserOutlined />}/>
        <span style={{marginLeft: 5}}>{ userInfo.username }</span>
      </li>
    </Popover>
  )
}

const mapStateToProps = ({ user }:IStoreState) => {
  return { userInfo: user.userInfo }
}

export default connect(mapStateToProps)(AvatarView)

import React from 'react'
import { Avatar, Popover, Link } from 'antd'
import { UserOutlined, PoweroffOutlined } from '@ant-design/icons'

const popoverList = [
  { name: '个人信息', path: '/personal' },
  { name: '消息中心', path: '/message' },
  { name: '账户信息', path: '/account' }
]

const PopoverContent = (
  <div className='popover-content'>
    {popoverList.map(el => (
      <Link to={el.path} key={el.name}>{el.name}</Link>
    ))}
    <div>
      <PoweroffOutlined style={{ fontSize: '14px', marginRight: '5px' }} />
      退出
    </div>
  </div>
)

const AvatarView:React.FC = () => {
  return (
    <Popover placement='bottomRight' content={PopoverContent}>
      <Avatar icon={<UserOutlined />}/>
    </Popover>
  )
}

export default AvatarView

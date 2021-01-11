import React, { useEffect } from 'react'
import { connect, DispatchProp } from 'react-redux'
import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { RouteComponentProps } from 'react-router-dom'
import { Form, Input, Button, Checkbox } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { login } from '@/store/actions'
import './index.scss'

type ThunkDispatchProps = ThunkDispatch<{}, {}, AnyAction>
type Props = {
  dispatch: ThunkDispatchProps
} & DispatchProp & RouteComponentProps

const Login:React.FC<Props> = ({ location, history, dispatch }) => {

  const onFinish = async (values:any) => {
    await dispatch(login(values))
  }

  const onFinishFailed = (errorInfo:any) => {
    console.log('Failed:', errorInfo)
  }
  return (
    <div className='login'>
      <div className='login-box'>
        <h1>系统登录</h1>
        <Form
          name='normal_login'
          className='login-form'
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          fields={[
            {name: ['phone'], value: '17317602369'},
            {name: ['password'], value: '17317602369'}
          ]}
        >
          <Form.Item
            name='phone'
            rules={[{ required: true, message: 'Please input your phone!' }]}
          >
            <Input prefix={<UserOutlined className='site-form-item-icon' />} placeholder='Phone' allowClear/>
          </Form.Item>
          <Form.Item
            name='password'
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input.Password
              prefix={<LockOutlined className='site-form-item-icon' />}
              type='password'
              placeholder='Password'
              autoComplete='new-password'
              allowClear
            />
          </Form.Item>

          <Form.Item>
            <Button type='primary' htmlType='submit' className='login-form-button'>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default connect()(Login)

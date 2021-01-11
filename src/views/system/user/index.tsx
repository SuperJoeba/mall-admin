import React, { useState, useEffect } from 'react'
import useKeepState from 'use-keep-state'
import { Form, Input, Button, Table, Space, Modal, Checkbox, Popconfirm, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { ColumnsType } from 'antd/es/table'
import IRouteProps from '@/routes/types'
import {GetUserList, CreateUser, UpdateUser, DeleteUser, GetRoleList} from '@/api'
import { formatTimeToStr } from '@/utils'

const CheckboxGroup = Checkbox.Group

interface UserTable {
  id: number;
  username: string;
  phone: string;
  roleList: any[];
  updatedAt: string,
  createdAt: string
}

interface State {
  dataSource: any[],
  pagination: {
    [key: string]: any
  },
  userId: number,
  roleList: any[],
  operate: string,
  titleMap: {
    create: string,
    update: string
  }
}

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
}

const namespace = 'User'
const initState:State = {
  dataSource: [],
  pagination: {
    page: 1,
    pageSize: 10,
    showSizeChanger: true,
    total: 0,
    pageSizeOptions: ['10', '20', '30', '40', '50']
  },
  userId: 0,
  roleList: [],
  operate: '',
  titleMap: {
    create: '新增用户',
    update: '编辑用户'
  }
}
const User:React.FC<IRouteProps> = () => {
  const [state, setState] = useKeepState(initState, namespace)
  const [form] = Form.useForm()
  const [userForm] = Form.useForm()
  const [visible, setVisible] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)

  const tableColumns:ColumnsType<UserTable> = [
    {
      key: 'id',
      title: '用户ID',
      dataIndex: 'id'
    },
    {
      key: 'username',
      title: '用户名',
      dataIndex: 'username'
    },
    {
      key: 'phone',
      title: '登录账户',
      dataIndex: 'phone'
    },
    {
      key: 'role',
      title: '用户角色',
      dataIndex: 'role',
      render: (_:any, record:any) => {
        return (<Space size='middle'>
          { record.roleList.map((item:any) => (
            <span key={item.id}>{item.name}</span>
          )) }
        </Space>)}
    },
    {
      key: 'updatedAt',
      title: '更新时间',
      dataIndex: 'updatedAt'
    },
    {
      key: 'createdAt',
      title: '创建时间',
      dataIndex: 'createdAt'
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size='middle'>
          <a onClick={() => handleUpdate(_, record)}>编辑</a>
          <Popconfirm title='确认删除该用户吗?' onConfirm={() => handleDelete(record.id)}>
            <a>删除</a>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  useEffect(() => {
    getUserList()
    getRoleList()
  }, [])

  const getUserList = async () => {
    const result = await GetUserList({page: 1, size: 10})
    result.list.forEach((item:any) => {
      item.createdAt = formatTimeToStr(item.createdAt, '')
      item.updatedAt = formatTimeToStr(item.updatedAt, '')
    })
    setState({
      dataSource: result.list,
      pagination: {
        ...state.pagination,
        page: result.page,
        total: result.total
      }
    })
  }

  const getRoleList = async () => {
    const result = await GetRoleList()
    setState({
      roleList: result.list.map((item:any) => ({label: item.name, value: item.id}))
    })
  }

  const handleCreate = () => {
    userForm.setFieldsValue({
      username: '',
      phone: '',
      roleIds: []
    })
    setState({operate: 'create'})
    setVisible(true)
  }

  const handleUpdate = (_:any, record:any) => {
    const roleIds = record.roleList.map((item:any) => item.id)
    userForm.setFieldsValue({...record, roleIds})
    setState({operate: 'update', userId: record.id})
    setVisible(true)
  }

  const handleDelete = async(id:number) => {
    const result = await DeleteUser({id})
    message.success('删除成功')
    getUserList()
  }

  const handleOk = async() => {
    const values = await userForm.validateFields()
    values.roleIds = values.roleIds.join(',')
    setConfirmLoading(true)
    let result = null
    if (state.operate === 'create') {
      result = await CreateUser(values)
    } else {
      const data = {...values, id: state.userId}
      result = await UpdateUser(data)
    }
    if (result) {
      setVisible(false)
      setConfirmLoading(false)
      await getUserList()
    }
  }

  const handleCancel = () => {
    setVisible(false)
    setConfirmLoading(false)
  }
  return (
    <React.Fragment>
      <Form layout='inline' form={form} style={{marginBottom: 15}}>
        <Form.Item name='username'>
          <Input placeholder='用户名' allowClear />
        </Form.Item>
        <Form.Item name='phone'>
          <Input type='number' placeholder='用户手机号' allowClear maxLength={11}/>
        </Form.Item>
        <Form.Item>
          <Button>重置</Button>
        </Form.Item>
        <Form.Item>
          <Button type='primary'>搜索</Button>
        </Form.Item>
        <Form.Item style={{flex: 1, textAlign: 'right'}}>
          <Button type='primary' icon={<PlusOutlined />} onClick={() => handleCreate()}>新增用户</Button>
        </Form.Item>
      </Form>
      <Table
        dataSource={state.dataSource}
        columns={tableColumns}
        rowKey='id'/>

      <Modal
        title={state.titleMap[state.operate]}
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Form {...layout} form={userForm}>
          <Form.Item
            label='用户名'
            name='username'
            rules={[
              {
                required: true,
                message: '输入用户名'
              }
            ]}>
            <Input placeholder='请输入用户名' maxLength={10} allowClear/>
          </Form.Item>
          <Form.Item
            label='登录账户'
            name='phone'
            rules={[
              {
                required: true,
                message: '输入登录账户'
              },
              {
                max: 11,
                message: '登录账户手机号错误'
              }
            ]}>
            <Input type='number' placeholder='请输入手机号' allowClear />
          </Form.Item>
          <Form.Item
            label='用户角色'
            name='roleIds'
            rules={[
              {
                required: true,
                message: '选择用户角色'
              }
            ]}>
            <CheckboxGroup options={state.roleList} />
          </Form.Item>
        </Form>
      </Modal>
    </React.Fragment>
  )
}

export default User

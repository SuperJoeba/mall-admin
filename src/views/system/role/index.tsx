import React, { useState, useEffect } from 'react'
import useKeepState from 'use-keep-state'
import { Form, Input, Button, Table, Space, Modal, Popconfirm, Drawer, Tree, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { ColumnsType } from 'antd/es/table'
import IRouteProps from '@/routes/types'
import { GetRoleList, CreateRole, UpdateRole, DeleteRole, GetRouteList, AuthRoleRoute, GetAuthList } from '@/api'
import { mapRoutesToMenus, formatTimeToStr } from '@/utils'

interface RoleTable {
  id: number;
  name: string;
  updatedAt: string,
  createdAt: string
}

interface State {
  dataSource: any[],
  roleId: number,
  operate: string,
  titleMap: {
    create: string,
    update: string
  },
  routeTreeData: any[],
  checkedKeys: number[],
  halfCheckedKeys: number[]
}

const namespace = 'Role'
const initState:State = {
  dataSource: [],
  roleId: 0,
  operate: '',
  titleMap: {
    create: '新增用户',
    update: '编辑用户'
  },
  routeTreeData: [],
  checkedKeys: [],
  halfCheckedKeys: []
}

const Role:React.FC<IRouteProps> = ({ name, actived }) => {
  const [state, setState] = useKeepState(initState, namespace)
  const [visible, setVisible] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [form] = Form.useForm()
  const [authVisible, setAuthVisible] = useState(false)

  const tableColumns:ColumnsType<RoleTable> = [
    {
      key: 'id',
      title: '角色ID',
      dataIndex: 'id',
      align: 'center'
    },
    {
      key: 'name',
      title: '角色名',
      dataIndex: 'name',
      align: 'center'
    },
    {
      key: 'updatedAt',
      title: '更新时间',
      dataIndex: 'updatedAt',
      align: 'center'
    },
    {
      key: 'createdAt',
      title: '创建时间',
      dataIndex: 'createdAt',
      align: 'center'
    },
    {
      title: '操作',
      key: 'action',
      align: 'center',
      render: (_, record) => (
        <Space size='middle'>
          <a onClick={() => handleAuth(_, record)}>设置权限</a>
          <a onClick={() => handleUpdate(_, record)}>编辑</a>
          <Popconfirm title='确认删除该用户吗?' onConfirm={() => handleDelete(record.id)}>
            <a>删除</a>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  useEffect(() => {
    getRoleList()
    getRouteList()
  }, [])

  useEffect(() => {
    if (!visible) {
      form.resetFields()
    }
  }, [visible])

  const getRoleList = async () => {
    const result = await GetRoleList()
    result.list.forEach((item:any) => {
      item.createdAt = formatTimeToStr(item.createdAt, '')
      item.updatedAt = formatTimeToStr(item.updatedAt, '')
    })
    setState({
      dataSource: result.list
    })
  }

  const getRouteList = async () => {
    const result = await GetRouteList()
    const treeData = mapRoutesToMenus(result?.list?.map((item:any) => ({title: item.name, key: item.id, ...item})))

    setState({
      routeTreeData: treeData
    })
  }

  const handleCreate = () => {
    setVisible(true)
    setState({ operate: 'create' })
    form.setFieldsValue({name: ''})
  }

  const handleAuth = async (_:any, record:any) => {
    setAuthVisible(true)
    const result = await GetAuthList({ roleId: record.id })

    setState({
      roleId: record.id,
      checkedKeys: result?.list?.filter((item:any) => !item.halfChecked).map((item:any) => item.routeId),
      halfCheckedKeys: result?.list?.filter((item:any) => item.halfChecked).map((item:any) => item.routeId),
    })
  }

  const handleUpdate = (_:any, record:any) => {
    setVisible(true)
    setState({ roleId: record.id, operate: 'update' })
    form.setFieldsValue({...record})
  }

  const handleDelete = async(id:number) => {
    const result = await DeleteRole({id})
    message.success('删除成功', 500)
    getRoleList()
  }

  const handleOk = async() => {
    const values = await form.validateFields()
    setConfirmLoading(true)
    let result = null
    if (state.operate === 'create') {
      result = await CreateRole(values)
    } else {
      const data = {...values, id: state.roleId }
      result = await UpdateRole(data)
    }

    if (result) {
      setVisible(false)
      setConfirmLoading(false)
      await getRoleList()
    }
  }

  const handleCheck = (checkedKeys:any, e:any) => {
    console.log(checkedKeys, e.halfCheckedKeys)
    setState({checkedKeys, halfCheckedKeys: e.halfCheckedKeys})
  }

  const handleCancel = () => {
    setVisible(false)
    setConfirmLoading(false)
  }

  const handleAuthConfirm = async() => {
    const checkedRoute = state.checkedKeys.map((item:number) => ({roleId: state.roleId, routeId: item, halfChecked: 0}))
    const halfCheckedRoute = state.halfCheckedKeys.map((item:number) => ({roleId: state.roleId, routeId: item, halfChecked: 1}))
    const result = await AuthRoleRoute([...checkedRoute, ...halfCheckedRoute])
    message.success('操作成功')
    setAuthVisible(false)
    getRoleList()
  }

  return (
    <React.Fragment>
      <Form layout='inline' style={{marginBottom: 15}}>
        <Form.Item name='name'>
          <Input placeholder='角色名' allowClear />
        </Form.Item>
        <Form.Item>
          <Button type='primary'>搜索</Button>
        </Form.Item>
        <Form.Item style={{flex: 1, textAlign: 'right'}}>
          <Button type='primary' icon={<PlusOutlined />} onClick={() => handleCreate()}>新增角色</Button>
        </Form.Item>
      </Form>

      <Table
        dataSource={state.dataSource}
        columns={tableColumns}
        rowKey='id'
      />

      <Modal
        title={state.titleMap[state.operate]}
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Form form={form}>
          <Form.Item
            label='角色名'
            name='name'
            rules={[
              {
                required: true,
                message: '输入角色名'
              }
            ]}>
            <Input allowClear maxLength={10}/>
          </Form.Item>
        </Form>
      </Modal>

      <Drawer
        title='权限设置'
        width={500}
        placement='right'
        closable={false}
        onClose={() => setAuthVisible(false)}
        visible={authVisible}
      >
        <div style={{textAlign: 'right'}}>
          <Button type='primary' onClick={() => handleAuthConfirm()}>确定</Button>
        </div>
        <Tree
          checkable
          treeData={state.routeTreeData}
          checkedKeys={state.checkedKeys}
          defaultExpandAll
          onCheck={handleCheck}
        />
      </Drawer>
    </React.Fragment>
  )
}

export default Role

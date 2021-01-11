import React, { useState, useEffect } from 'react'
import useKeepState from 'use-keep-state'
import { Form, Input, TreeSelect, Select, Button, Table, Space, Modal, Radio, Popconfirm, List, Card, message } from 'antd'
import * as Icon from '@ant-design/icons'
import { ColumnsType } from 'antd/es/table'
import IRouteProps from '@/routes/types'
import { CreateRoute, UpdateRoute, DeleteRoute, GetRouteList} from '@/api'
import { mapRoutesToMenus } from '@/utils'
import './index.scss'

const icons = [
  'BankOutlined',
  'AccountBookOutlined',
  'AppstoreOutlined',
  'CommentOutlined',
  'BugOutlined',
  'FolderOpenOutlined',
  'GiftOutlined',
  'MedicineBoxOutlined',
  'MergeCellsOutlined',
  'ProjectOutlined',
  'SettingOutlined',
  'TableOutlined',
  'UserOutlined',
  'VideoCameraOutlined',
  'UnlockOutlined',
  'ShoppingCartOutlined',
  'ShopOutlined',
  'ProfileOutlined',
  'DollarCircleOutlined',
  'DashboardOutlined',
  'AimOutlined',
  'BookOutlined',
]

interface RouteTable {
  id: number;
  path: string;
  type: number;
  name: string;
  icon: string;
  isMenu: Number;
  children?: any[]
}

interface State {
  dataSource: any[],
  routeTreeData: any[]
  userId: number,
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

const namespace = 'Route'
const initState:State = {
  dataSource: [],
  routeTreeData: [],
  userId: 0,
  operate: '',
  titleMap: {
    create: '新增菜单',
    update: '编辑菜单'
  }
}
const Route:React.FC<IRouteProps> = () => {
  const [state, setState] = useKeepState(initState, namespace)
  const [form] = Form.useForm()
  const [visible, setVisible] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)

  const tableColumns:ColumnsType<RouteTable> = [
    {
      key: 'id',
      title: 'ID',
      dataIndex: 'id'
    },
    {
      key: 'name',
      title: '路由名称',
      dataIndex: 'name',
      align: 'center'
    },
    {
      key: 'path',
      title: '路由路径',
      dataIndex: 'path',
      align: 'center'
    },
    {
      key: 'icon',
      title: '菜单图标',
      dataIndex: 'icon',
      align: 'center',
      render: (_, record) => (
        <Space size='middle'>
          {
            record.icon ? React.createElement(IconElement[record.icon], {
              style: { fontSize: '20px'}
            }) : null
          }
        </Space>
      ),
    },
    {
      key: 'isMenu',
      title: '是否菜单',
      dataIndex: 'isMenu',
      align: 'center',
      render: (_, record) => (
        <Space size='middle'>
          {
            record.isMenu ? '是' : '否'
          }
        </Space>
      ),
    },
    {
      title: '操作',
      key: 'action',
      align: 'center',
      render: (_, record) => (
        <Space size='middle'>
          <a onClick={() => handleAddRoute(_, record)}>添加子路由</a>
          <a onClick={() => handleUpdate(_, record)}>编辑</a>
          <Popconfirm title='确认删除该路由吗?' onConfirm={() => handleDelete(record.id)}>
            <a>删除</a>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  const initialValues = { pid: 0, type: 1, isMenu: 1, name: '', path: '', icon: [] }

  useEffect(() => {
    getRouteList()
  }, [])

  const getRouteList = async () => {
    const result = await GetRouteList()
    const treeData = mapRoutesToMenus(result?.list?.map((item:any) => ({label: item.name, value: item.id, ...item})))
    setState({
      dataSource: treeData,
      routeTreeData: [
        {label: '主目录', value: 0},
        ...treeData
      ]
    })
  }

  const handleCreate = () => {
    form.setFieldsValue(Object.assign({}, initialValues))
    setState({operate: 'create'})
    setVisible(true)
  }

  const handleAddRoute = (_:any, record:any) => {
    form.setFieldsValue(Object.assign({}, initialValues, {pid: record.id}))
    setState({operate: 'create'})
    setVisible(true)
  }

  const handleUpdate = (_:any, record:any) => {
    const row = Object.assign({}, record)
    row.icon = row.icon ? [row.icon] : []
    form.setFieldsValue(row)
    setState({operate: 'update'})
    setVisible(true)
  }

  const handleDelete = async(id:number) => {
    const result = await DeleteRoute({id})
    message.success('删除成功')
    getRouteList()
  }

  const handleOk = async() => {
    const values = await form.validateFields()
    const data = Object.assign({}, values)
    data.icon = data.icon.join('')
    setConfirmLoading(true)
    let result = null
    if (state.operate === 'create') {
      result = await CreateRoute(data)
    } else {
      result = await UpdateRoute({...data, id: form.getFieldValue('id')})
    }
    if (result) {
      setVisible(false)
      setConfirmLoading(false)
      message.success('操作成功')
      getRouteList()
    }
  }

  const handleCancel = () => {
    setVisible(false)
    setConfirmLoading(false)
  }

  const handleChooseIcon = (item:string) => {
    form.setFieldsValue({icon: [item]})
  }
  const IconElement:any = Icon
  const iconRender = () => (
    <Card className='icon-box'>
      {
        icons.map((item:string, idx:number) => {
          return (
            <div key={idx} onClick={() => handleChooseIcon(item)}>
              <Card.Grid className='icon-card'>
                {
                  React.createElement(IconElement[item], {
                    style: { fontSize: '20px'}
                  })
                }
              </Card.Grid>
            </div>
          )
        })
      }
    </Card>
  )

  const tagRender = (props:any) => React.createElement(IconElement[props.value], {
    style: { fontSize: '20px'}
  })

  return (
    <React.Fragment>
      <Button type='primary' icon={<Icon.PlusOutlined />} onClick={() => handleCreate()}>新增路由</Button>
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
        <Form {...layout} form={form} initialValues={initialValues}>
          <Form.Item
            label='上级路由'
            name='pid'
            rules={[
              {
                required: true,
                message: '请选择上级路由'
              }
            ]}>
            <TreeSelect
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              treeData={state.routeTreeData}
              placeholder='请选择'
              treeDefaultExpandAll
            />
          </Form.Item>
          <Form.Item
            label='路由类型'
            name='type'>
            <Radio.Group>
              <Radio value={1}>路由</Radio>
              <Radio value={2}>权限块</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label='是否菜单'
            name='isMenu'>
            <Radio.Group>
              <Radio value={1}>是</Radio>
              <Radio value={0}>否</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label='路由名称'
            name='name'
            rules={[
              {
                required: true,
                message: '输入路由名称'
              }
            ]}>
            <Input placeholder='请输入路由名称' maxLength={10} allowClear/>
          </Form.Item>
          <Form.Item
            label='路由路径'
            name='path'
            rules={[
              {
                required: true,
                message: '请输入路由路径'
              }
            ]}>
            <Input placeholder='请输入路由路径' allowClear />
          </Form.Item>
          <Form.Item
            label='菜单图标'
            name='icon'>
            <Select mode='tags' placeholder='请选择菜单图标' dropdownRender={iconRender} tagRender={tagRender}></Select>
          </Form.Item>
        </Form>
      </Modal>
    </React.Fragment>
  )
}

export default Route

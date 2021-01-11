import React, { useState } from 'react'
import { LayoutState } from '../index'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import './index.scss'
import { Tabs, Dropdown, Menu } from 'antd'

const { TabPane } = Tabs
const menu = (
  <Menu>
    <Menu.Item key='1'>关闭所有</Menu.Item>
    <Menu.Item key='2'>关闭左侧</Menu.Item>
    <Menu.Item key='3'>关闭右侧</Menu.Item>
    <Menu.Item key='4'>关闭其他</Menu.Item>
  </Menu>
)


type Props = LayoutState & RouteComponentProps
const Tabbar:React.FC<Props> = ({ activeKey, setActiveKey, tabPanes, setTabPanes, history }) => {

  const onChange = (activeKey:string) => {
    setActiveKey && setActiveKey(activeKey)
    const path = tabPanes?.filter(item => item.id === Number(activeKey))[0]?.path
    if (path) {
      history.push(path)
    }
  }
  const onEdit = (targetKey:any, action:string) => {
    if (action === 'remove') {
      if (tabPanes) {
        const index = tabPanes.findIndex(item => item.id === Number(targetKey))
        let key = '', path = ''
        if (targetKey === activeKey) {
          if (index === 0) {
            if (tabPanes.length > 1) {
              key = tabPanes[index + 1].id
              path = tabPanes[index + 1].path || '/layout'
            } else {
              key = ''
              path = '/layout'
            }
          } else {
            key = tabPanes[index - 1].id
            path = tabPanes[index - 1].path || '/layout'
          }
          setActiveKey && setActiveKey(key.toString())
          history.push(path)
        }
        const panes = JSON.parse(JSON.stringify(tabPanes))
        panes.splice(index, 1)
        setTabPanes && setTabPanes(panes)
      }
    }
  }

  return (
    <Dropdown overlay={menu} trigger={['contextMenu']}>
      <Tabs
        type='editable-card'
        hideAdd
        onChange={onChange}
        onEdit={onEdit}
        activeKey={activeKey}
      >
        {tabPanes?.map(pane => (
          <TabPane tab={pane?.name} key={pane?.id} />
        ))}
      </Tabs>
    </Dropdown>
  )
}

export default withRouter(Tabbar)


import React, { useState, useEffect } from 'react'
import { connect, DispatchProp } from 'react-redux'
import { withRouter, RouteComponentProps, Link } from 'react-router-dom'
import { setRoutes } from '@/store/actions'
import './index.scss'
import { Layout, Menu } from 'antd'
import * as Icon from '@ant-design/icons'
import { LayoutState } from '../index'
import { IStoreState } from '@/store'
import IRouteProps from '@/routes/types'
import { mapRoutesToMenus } from '@/utils'

const { Sider } = Layout
const { SubMenu } = Menu

type Props = LayoutState & RouteComponentProps & ReturnType<typeof mapStateToProps> & DispatchProp


const SiderView:React.FC<Props> = ({
  collapsed,
  tabPanes,
  setTabPanes,
  setActiveKey,
  asyncRoutes,
  location,
  dispatch
}) => {
  const [openKeys, setOpenKeys] = useState<Array<string>>([])
  const [selectedKeys, setSelectedKeys] = useState<Array<string>>([])

  useEffect(() => {
    const pathname = location.pathname
    const selectedItem = asyncRoutes.filter(item => {
      if (Array.isArray(item.path)) {
        if (item.path.includes(pathname)) {
          return item
        }
      } else {
        if (item.path === pathname) {
          return item
        }
      }
    })

    if (selectedItem.length) {
      let keys = selectedItem.map(item => item.id.toString())
      let openKeys:string[] = []
      const filterOpenKeys = (pid:any) => {
        asyncRoutes.forEach(item => {
          if (item.id === pid) {
            openKeys.push(item.id.toString())
            if (item.pid) {
              filterOpenKeys(item.pid)
            }
          }
        })
      }
      filterOpenKeys(selectedItem[0].pid)
      setOpenKeys(openKeys)
      setSelectedKeys(keys)
      if (tabPanes) {
        if (!tabPanes.some(item => item.id === Number(keys[0]))) {
          const panes = [...tabPanes, ...selectedItem]
          setTabPanes && setTabPanes(panes)
        }
        setActiveKey && setActiveKey(keys[0])
      }
    } else {
      setSelectedKeys([])
    }
  }, [location.pathname, asyncRoutes])

  const mapMenusToTree = (asyncRoutes:IRouteProps[]) => {
    const routes = mapRoutesToMenus(asyncRoutes)
    const IconElement:any = Icon
    return routes.map(item => {
      const Icon = () => item.icon ? React.createElement(IconElement[item.icon], {
        style: { fontSize: '20px'}
      }) : null
      if (item.children) {
        const menuItems = mapMenusToTree(item.children)
        return (
          <SubMenu key={item.id} icon={<Icon />} title={item?.name}>
            { menuItems }
          </SubMenu>
        )
      } else {
        let path = item.path ? item.path : ''
        if (Array.isArray(path)) {
          path = path[0]
        }
        return (
          <Menu.Item key={item.id} icon={<Icon />}>
            <Link to={path}>{item?.name}</Link>
          </Menu.Item>
        )
      }
    })
  }

  const onOpenChange = (openKeys:any) => {
    setOpenKeys(openKeys)
  }

  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className='logo'>Mall-Admin</div>
      <Menu theme='dark' mode='inline' selectedKeys={selectedKeys} openKeys={openKeys} onOpenChange={onOpenChange}>
        {
          mapMenusToTree(asyncRoutes)
        }
      </Menu>
    </Sider>
  )
}

const mapStateToProps = ({ route }:IStoreState) => {
  return { asyncRoutes: route.asyncRoutes }
}
export default connect(mapStateToProps)(withRouter(SiderView))

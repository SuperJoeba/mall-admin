import { message } from 'antd'
import IRouteProps from '@/routes/types'
import { asyncRoutes } from '@/routes'

// 浏览器全屏
export const fullScreen = () => {
  const doc = document.documentElement as any
  try {
    if (doc.requestFullScreen) {
      doc.requestFullScreen()
    } else if (doc.webkitRequestFullScreen) {
      doc.webkitRequestFullScreen()
    } else if (doc.mozRequestFullScreen) {
      doc.mozRequestFullScreen()
    } else if (doc.msRequestFullScreen) {
      doc.msRequestFullScreen()
    }
  } catch (error) {
    message.warn('您所使用的浏览器不支持全屏')
  }
}

// 退出全屏
export const existFullScreen = () => {
  const doc = document as any
  try {
    if (doc.existFullScreen) {
      doc.existFullScreen()
    } else if (doc.webkitCancelFullScreen) {
      doc.webkitCancelFullScreen()
    } else if (doc.mozCancelFullScreen) {
      doc.mozCancelFullScreen()
    } else if (doc.msRequestFullScreen) {
      doc.msExistFullScreen()
    }
  } catch (error) {
    message.warn('您所使用的浏览器不支退出全屏，请按ESC')
  }
}

export const mapRoutesToMenus = (routes:IRouteProps[]) => {
  let data:IRouteProps[] = []
  for (let i = 0; i < routes.length; i++) {
    data.push(routes[i])
  }
  let result:IRouteProps[] = []
  if(!Array.isArray(data)) {
    return result
  }
  data.forEach(item => {
    if (item.children) delete item.children
  })
  let map:IRouteProps = {}
  data.forEach(item => {
    map[item.id] = item
  })
  // 利用数组对象浅拷贝
  data.forEach(item => {
    let parent = map[item.pid]
    if(parent) {
      (parent.children || (parent.children = [])).push(item)
    } else {
      result.push(item)
    }
  })
  return result
}

export const mapResToRouter = (routes:IRouteProps[]) => {
  let data:IRouteProps[] = []
  for (let i = 0; i < routes.length; i++) {
    data.push(routes[i])
  }
  data.forEach(item => {
    asyncRoutes.forEach(route => {
      if (item.path === route.path) {
        item.component = route.component
      }
    })
  })
  return data
}


import React from 'react'
import { Result, Button } from 'antd'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { ExceptionStatusType } from 'antd/lib/result'

interface Props {
  status?: ExceptionStatusType
}

const statusMap = {
  403: {
    title: '403',
    subTitle: '抱歉，您暂无权限访问该当前页面',
  },
  404: {
    title: '404',
    subTitle: '抱歉，未找到您想访问的页面',
  },
  500: {
    title: '500',
    subTitle: '抱歉, 服务端错误',
  }
}

const Exception: React.FC<Props & RouteComponentProps> = function ({ history, status = '404' }) {
  return (
    <Result
      status={status}
      extra={<Button type='primary' onClick={history.goBack}>返回</Button>}
      {...statusMap[status]}
    />
  )
}

export default withRouter(Exception)

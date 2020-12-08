import React, { useEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom'

const Login:React.FC<RouteComponentProps> = ({ location, history }) => {

  useEffect(() => {
    console.log(location.state)
    history.replace('/login')
  }, [])
  return <div>登录</div>
}

export default Login

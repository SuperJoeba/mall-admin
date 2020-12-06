import React from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import CONFIG from '@/config'
import { IStoreState } from '@/store'
import routesConfig from './routes'
import RouteItem from '@/components/route-item'

const AppRouter: React.FC = () => {
  return (
    <Router basename={CONFIG.baseURL}>
      <Switch>
        {
          routesConfig.map((route, index) => (
            <RouteItem {...route} key={index}/>
          ))
        }
      </Switch>
    </Router>
  )
}

export default AppRouter


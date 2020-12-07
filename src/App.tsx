import React from 'react'
import { Spin } from 'antd'
import { connect } from 'react-redux'
import { IStoreState } from '@/store'
import AppRouter from './routes'

const mapStateToProps = (state: IStoreState) => {
  return { loading: state.system.loading }
}

type Props = ReturnType<typeof mapStateToProps>

const App:React.FC<Props> = ({ loading }) => {
  return (
    <Spin
      spinning={loading}
      tip='加载中...'
      size='large'
      style={{
        width: '100%',
        height: '100vh',
        maxHeight: '100vh'
      }}>
      <div style={{ display: loading ? 'none' : 'block' }}>
        <AppRouter />
      </div>
    </Spin>
  )
}

export default connect(mapStateToProps)(App)

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
    <div className='flex-center' style={{
      width: '100%',
      height: '100vh',
    }}>
      <Spin spinning={loading} tip='加载中...' size='large'>
        <AppRouter />
      </Spin>
    </div>
  )
}

export default connect(mapStateToProps)(App)

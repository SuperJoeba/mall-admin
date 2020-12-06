import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers'
import { IUserState } from './reducers/user'
import { IMenuState } from './reducers/menu'
import { ISystemState } from './reducers/system'


export interface IStoreState {
  user: IUserState,
  menu: IMenuState,
  system: ISystemState
}

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
)

export default store

import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import {persistStore} from 'redux-persist'
import rootReducer from './reducers'
import { IUserState } from './reducers/user'
import { IRouteState } from './reducers/route'
import { ISystemState } from './reducers/system'


export interface IStoreState {
  user: IUserState,
  route: IRouteState,
  system: ISystemState
}

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
)

export const persistor = persistStore(store)
export default store

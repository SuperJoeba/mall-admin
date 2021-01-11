import user from './user'
import route from './route'
import system from './system'
import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const rootPersistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['user']
}

const rootReducer = combineReducers({
  user,
  route,
  system
})

export default persistReducer(rootPersistConfig, rootReducer)

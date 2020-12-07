import user from './user'
import route from './route'
import system from './system'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  user,
  route,
  system
})

export default rootReducer

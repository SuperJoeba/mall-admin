import user from './user'
import menu from './menu'
import system from './system'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  user,
  menu,
  system
})

export default rootReducer

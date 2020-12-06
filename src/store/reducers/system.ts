import { SYSTEM } from '../constants'

const { CLOSELOAD } = SYSTEM

export interface ISystemState {
    loading?: boolean
}

const initialState:ISystemState = {
  loading: true
}

const system = (state = initialState, action:any) => {
  switch(action.type) {
    case CLOSELOAD:
      return Object.assign({}, state, {
        loading: action.loading
      })
    default:
      return state
  }
}

export default system

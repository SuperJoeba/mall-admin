import { USER } from '../constants'
import { Dispatch } from 'redux'
import { Login } from '@/api'

const { LOGIN } = USER

export const setUser = (state:any = {}) => {
  return {
    type: LOGIN,
    userInfo: state.userInfo,
    token: state.accessToken
  }
}

export const login = (data:any) => async(dispatch:Dispatch) => {
  try {
    const result = await Login(data)
    return dispatch(setUser(result))
  } catch (error) {
    return dispatch(setUser())
  }
}

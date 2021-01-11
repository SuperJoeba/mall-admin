import { USER } from '../constants'

const { LOGIN } = USER
export interface IUserInfoProps {
  username: string,
  phone: string,
  avatar: string | undefined,
  roleId: string,
}

export interface IUserState {
    token: string | undefined,
    userInfo: IUserInfoProps
}

const initialState: IUserState = {
  token: undefined,
  userInfo: {
    username: '',
    phone: '',
    avatar: undefined,
    roleId: '',
  }
}

const user = (state = initialState, action:any):IUserState => {
  switch (action.type) {
    case LOGIN:
      return Object.assign({}, state, {
        token: action.token, userInfo: action.userInfo
      })
    default:
      return state
  }
}

export default user


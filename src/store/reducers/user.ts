import { USER } from '../constants'

const { LOGIN } = USER
export interface IUserInfoProps {
    userId: string | undefined,
    userName: string,
    phone: string,
    avatarUrl: string | undefined,
    role: string,
    createAt: string
}

export interface IUserState {
    token: string | undefined,
    userInfo: IUserInfoProps
}

const initialState: IUserState = {
  token: undefined,
  userInfo: {
    userId: undefined,
    userName: '',
    phone: '',
    avatarUrl: undefined,
    role: '',
    createAt: ''
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


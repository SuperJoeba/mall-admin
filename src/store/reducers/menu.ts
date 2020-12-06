import { ForwardRefExoticComponent } from 'react'
import { MENU } from '../constants'

const { GETMENU } = MENU

export interface IMenu {
    path: string
    name: string,
    icon: ForwardRefExoticComponent<any>,
    children: IMenu[]
}

export interface IMenuState {
    menus: IMenu[]
}

const initialState:IMenuState = {
  menus: []
}

const menu = (state = initialState, action: any) => {
  switch (action.type) {
    case GETMENU:
      return Object.assign({}, state, {
        menus: action.menus
      })
    default:
      return state
  }
}

export default menu

import { MENU } from '../constants'
import { Dispatch } from 'redux'
import { GetMenus } from '@/api'
import { IMenu } from '../reducers/menu'

const { GETMENU } = MENU

export const setMenu = (menus:Array<IMenu> = []) => {
  return {
    type: GETMENU,
    menus
  }
}

export const getMenus = () => (dispatch:Dispatch) => GetMenus().then(res => dispatch(setMenu(res)))


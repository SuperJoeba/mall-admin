import { SYSTEM } from '../constants'

const { CLOSELOAD } = SYSTEM

export const setLoading = (loading:boolean) => ({
  type: CLOSELOAD,
  loading
})

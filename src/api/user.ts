import service from '@/utils/request'

export function Login(data:any):Promise<any> {
  return service({
    url: '/user/login',
    method: 'POST',
    data
  })
}

export function CreateUser(data:any):Promise<any> {
  return service({
    url: '/user/create',
    method: 'POST',
    data
  })
}

export function UpdateUser(data:any):Promise<any> {
  return service({
    url: '/user/update',
    method: 'POST',
    data
  })
}

export function DeleteUser(data:any):Promise<any> {
  return service({
    url: '/user/delete',
    method: 'DELETE',
    data
  })
}

export function GetUserList(params:any):Promise<any> {
  return service({
    url: '/user/list',
    method: 'GET',
    params
  })
}

export function GetUserAuthorities():Promise<any> {
  return service({
    url: '/user/authorities',
    method: 'GET'
  })
}

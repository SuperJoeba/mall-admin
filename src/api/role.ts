import service from '@/utils/request'


export function CreateRole(data:any):Promise<any> {
  return service({
    url: '/role/create',
    method: 'POST',
    data
  })
}

export function UpdateRole(data:any):Promise<any> {
  return service({
    url: '/role/update',
    method: 'POST',
    data
  })
}

export function DeleteRole(data:any):Promise<any> {
  return service({
    url: '/role/delete',
    method: 'DELETE',
    data
  })
}

export function GetRoleList():Promise<any> {
  return service({
    url: '/role/list',
    method: 'GET'
  })
}

export function AuthRoleRoute(data:any):Promise<any> {
  return service({
    url: '/role/auth',
    method: 'POST',
    data
  })
}

export function GetAuthList(params:any):Promise<any> {
  return service({
    url: '/role/authList',
    method: 'GET',
    params
  })
}

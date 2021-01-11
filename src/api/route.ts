import service from '@/utils/request'

export function CreateRoute(data:any):Promise<any> {
  return service({
    url: '/route/create',
    method: 'POST',
    data
  })
}

export function UpdateRoute(data:any):Promise<any> {
  return service({
    url: '/route/update',
    method: 'POST',
    data
  })
}

export function DeleteRoute(data:any):Promise<any> {
  return service({
    url: '/route/delete',
    method: 'DELETE',
    data
  })
}

export function GetRouteList():Promise<any> {
  return service({
    url: '/route/list',
    method: 'GET'
  })
}

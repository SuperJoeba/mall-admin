import { ForwardRefExoticComponent } from 'react'

interface IPermissionProps {
    id: string,
    name: string
}

interface IRouteConfigProps {
    name?: string,
    path?: string,
    component?: any,
    exact?: boolean,
    icon?: string,
    permissions?: IPermissionProps[]
    keepAlive?: boolean,
    [propName: string]: any
}
interface IChildRouteProps {
    children?: Array<IRouteProps>
}

export default interface IRouteProps extends IRouteConfigProps, IChildRouteProps {}

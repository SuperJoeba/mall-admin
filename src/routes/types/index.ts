interface IPermissionProps {
    id: string,
    name: string
}
interface IMetaProps {
    title?: string
    icon?: string,
    permissions?: IPermissionProps[]
}

interface IRedirectProps {
    to: string | object;
    from: string;
    push?: boolean;
    exact?: boolean;
    strict?: boolean;
  }

interface IRouteConfigProps {
    path: string[] | string,
    component?: any,
    exact?: boolean,
    meta?: IMetaProps,
    redirect?: IRedirectProps,
    [propName: string]: any
}
interface IChildrenRouteProps {
children?: Array<IRouteProps>
}

export default interface IRouteProps extends IRouteConfigProps, IChildrenRouteProps {}

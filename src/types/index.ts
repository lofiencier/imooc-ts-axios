/*
 * @Author: Envy
 * @Date: 2019-12-04 15:31:03
 * @LastEditors: Envy
 * @LastEditTime: 2019-12-13 16:44:08
 * @Description: Do no edit
 */
export interface Axios{
  interceptors: {
    request: AxiosInterceptorManager<AxiosRequestConfig>
    response: AxiosInterceptorManager<AxiosPromise>
  }
  request<T = any>(cofnig:AxiosRequestConfig):AxiosPromise<T>

  get<T = any>(url:string, config?:AxiosRequestConfig):AxiosPromise<T>

  delete<T = any>(url:string, config?:AxiosRequestConfig):AxiosPromise<T>

  head<T = any>(url:string, config?:AxiosRequestConfig):AxiosPromise<T>

  options<T = any>(url:string, config?:AxiosRequestConfig):AxiosPromise<T>

  post<T = any>(url:string, data?:any, config?:AxiosRequestConfig):AxiosPromise<T>

  put<T = any>(url:string, data?:any, config?:AxiosRequestConfig):AxiosPromise<T>

  patch<T = any>(url:string, data?:any, config?:AxiosRequestConfig):AxiosPromise<T>
}

export interface AxiosInstance extends Axios{
  <T=any>(config:AxiosRequestConfig):AxiosPromise<T>
  
  <T=any>(url:string, config?:AxiosRequestConfig):AxiosPromise<T>
}

export interface AxiosInterceptorManager<T>{
  use(resolved:ResolvedFn<T>, rejected?:RejectedFn):number

  eject(id:number):void
}
export interface ResolvedFn<T=any>{
  (val:T):T|Promise<T>
}

export interface RejectedFn{
  (error:any):any
}

export interface AxiosRequestConfig<T = any>{
  url?: string
  method?: Method
  data?: T
  params?: any
  headers?:any
  responseType?:XMLHttpRequestResponseType
  timeout?:number
  [propName: string]: any
  transformRequest?: AxiosTransformer | AxiosTransformer[]
  TransformResponse?: AxiosTransformer | AxiosTransformer[]
}

export interface AxiosTransformer{
  (data: any, headers?: any): any
}

export type Method ='get'
| 'GET'
| 'post'
| 'POST'
| 'head'
| 'HEAD'
| 'options'
| 'OPTIONS'
| 'put'
| 'PUT'
| 'patch'
| 'PATCH'
| 'delete'
| 'DELETE'

export interface AxiosError extends Error{
  config:AxiosRequestConfig
  code?:string
  request?:any
  response?:AxiosResponse
  isAxiosError:boolean
}

export interface AxiosResponse<T = any>{
  data:T
  status:number
  statusText:string
  headers:any
  config:AxiosRequestConfig
  request:any
}
export interface AxiosPromise<T = any> extends Promise<AxiosResponse<T>> {}
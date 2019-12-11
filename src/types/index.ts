/*
 * @Author: Envy
 * @Date: 2019-12-04 15:31:03
 * @LastEditors: Envy
 * @LastEditTime: 2019-12-11 10:51:05
 * @Description: Do no edit
 */
export interface Axios{
  request(cofnig:AxiosRequestConfig):AxiosPromise

  get(url:string, config?:AxiosRequestConfig):AxiosPromise

  delete(url:string, config?:AxiosRequestConfig):AxiosPromise

  head(url:string, config?:AxiosRequestConfig):AxiosPromise

  options(url:string, config?:AxiosRequestConfig):AxiosPromise

  post(url:string, data?:any, config?:AxiosRequestConfig):AxiosPromise

  put(url:string, data?:any, config?:AxiosRequestConfig):AxiosPromise

  patch(url:string, data?:any, config?:AxiosRequestConfig):AxiosPromise
}

export interface AxiosInstance extends Axios{
  (config:AxiosRequestConfig):AxiosPromise
}

export interface AxiosRequestConfig{
  url?: string
  method?: Method
  data?: any
  params?: any,
  headers?:any,
  responseType?:XMLHttpRequestResponseType,
  timeout?:number
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
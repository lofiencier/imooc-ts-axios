/*
 * @Author: Envy
 * @Date: 2019-12-11 10:09:03
 * @LastEditors: Envy
 * @LastEditTime: 2019-12-11 10:57:44
 * @Description: Do no edit
 */
import { AxiosPromise, AxiosRequestConfig, AxiosResponse, Method } from '../types'
import xhr from './xhr'
import { buildURL } from '../helpers/url'
import { transformRequest, transformResponse } from '../helpers/data'
import { processHeaders } from '../helpers/headers'
import dispatchRequest from './dispatchRequest'

export default class Axios{
  request(config:AxiosRequestConfig):AxiosPromise{
    return dispatchRequest(config)
  }

  get(url:string, config?:AxiosRequestConfig):AxiosPromise{
    return this._requestMethodWithoutData('get', url, config);
  }
  
  delete(url:string, config?:AxiosRequestConfig):AxiosPromise{
    return this._requestMethodWithoutData('delete', url, config)
  }

  head(url:string, config?:AxiosRequestConfig):AxiosPromise{
    return this._requestMethodWithoutData('head', url, config);
  }

  options(url:string, config?:AxiosRequestConfig):AxiosPromise{
    return this._requestMethodWithoutData('head', url, config);
  }

  post(url:string, data?:any, config?:AxiosRequestConfig):AxiosPromise{
    return this._requestMethodWithData('post', url, data, config);
  }

  put(url:string, data?:any, config?:AxiosRequestConfig):AxiosPromise{
    return this._requestMethodWithData('put', url, data, config);
  }

  patch(url:string, data?:any, config?:AxiosRequestConfig):AxiosPromise{
    return this._requestMethodWithData('patch', url, data, config);
  }
  
  _requestMethodWithoutData(method:Method, url:string, config?:AxiosRequestConfig){
    return this.request(
      Object.assign(config||{},{
        method,
        url
      })
    )
  }
  _requestMethodWithData(method:Method, url:string, data?:any, config?:AxiosRequestConfig){
    return this.request(
      Object.assign(config||{},{
        method,
        url,
        data
      })
    )
  }
}
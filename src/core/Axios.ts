/*
 * @Author: Envy
 * @Date: 2019-12-11 10:09:03
 * @LastEditors: Envy
 * @LastEditTime: 2019-12-13 15:20:45
 * @Description: Do no edit
 */
import { AxiosPromise, AxiosRequestConfig, AxiosResponse, Method, ResolvedFn, RejectedFn } from '../types'
import xhr from './xhr'
import { buildURL } from '../helpers/url'
import { transformRequest, transformResponse } from '../helpers/data'
import { processHeaders } from '../helpers/headers'
import dispatchRequest from './dispatchRequest'
import InterceptorManager from './InterceptorManager'

interface Interceptors {
  request: InterceptorManager<AxiosRequestConfig>
  response: InterceptorManager<AxiosResponse>
}

interface PromiseChain {
  resolved: ResolvedFn | ((config: AxiosRequestConfig)=>AxiosPromise)
  rejected?: RejectedFn
}

export default class Axios{
  defaults: AxiosRequestConfig

  interceptors: Interceptors
  constructor(initConfig:AxiosRequestConfig){
    this.interceptors = {
      request: new InterceptorManager<AxiosRequestConfig>(),
      response: new InterceptorManager<AxiosResponse>()
    }
    this.defaults = initConfig;
  }
  request(url:any, config?:any):AxiosPromise{
    if(typeof url === 'string'){
      if(!config) config = {}
      config = {}
    }else{
      config = url
    }
    const chain :PromiseChain[]=[{
      resolved: dispatchRequest,
      rejected: undefined
    }];
    // [reqInter1, reqInter2,...dispatch, resInter1, resInter2]
    // 从第一个开始.solve往下传递config
    // 到dispatch的时候，只有resolve才能往下传递response
    this.interceptors.request.forEach(interceptor => {
      // 所以这里才会是从头插入
      chain.unshift(interceptor);
    })
    
    this.interceptors.response.forEach(interceptor => {
      // 所以这里才会是从尾部推进
      chain.push(interceptor)
    })
    // 为了保持dispatchRequest的promise永远在中间
    
    // 所以才能一开始就promise.reolve
    let promise = Promise.resolve(config);

    while(chain.length){
      const { resolved, rejected } = chain.shift()!;
      promise = promise.then(resolved, rejected);
    }
    
    return promise
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
/*
 * @Author: Envy
 * @Date: 2019-12-12 16:03:26
 * @LastEditors: Envy
 * @LastEditTime: 2019-12-12 17:21:30
 * @Description: Do no edit
 */
import { ResolvedFn, RejectedFn } from '../types'

interface Interceptor<T>{
  resolved:ResolvedFn<T>
  rejected?:RejectedFn
}

export default class InterceptorManager<T>{
  private interceptors:Array<Interceptor<T>|null>

  constructor(){
    this.interceptors = [];
  }
  
  use(resolved:ResolvedFn<T>, rejected?:RejectedFn):number{
    this.interceptors.push({
      resolved,
      rejected
    });
    // 对应const id = this.interceptors.request.use(req,res)
    // 这里只是回传了id而已，想太多
    return this.interceptors.length-1;
  }

  forEach(fn:(interceptor:Interceptor<T>)=>void){
    // 这里封装了.forEach,只有数组中的当前项不为空时，才会执行fn(i)
    // 把interceptor(this.interceptor[i])传入fn
    // 对应Axios.ts中的this.interceptors.request.forEach(fn(interceptor))
    this.interceptors.forEach(interceptor=>{
      if(interceptor !== null){
        fn(interceptor)
      }
    })
  }

  eject(id:number):void{
    if(this.interceptors[id]){
      this.interceptors[id] = null;
    }
  }
}
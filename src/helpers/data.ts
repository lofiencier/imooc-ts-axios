/*
 * @Author: Envy
 * @Date: 2019-12-05 10:50:03
 * @LastEditors: Envy
 * @LastEditTime: 2019-12-10 17:31:48
 * @Description: Do no edit
 */
import { isPlainObject } from './utils';

export function transformRequest(data:any):any{
  if(isPlainObject(data)){
    console.log('data :', data);
    return JSON.stringify(data)
  }
  return data
}

export function transformResponse(data:any):any{
  if(typeof data === 'string'){
    try{
      data = JSON.parse(data);
    } catch(err){
      // ??
    }
  }
  return data
}
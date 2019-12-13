/*
 * @Author: Envy
 * @Date: 2019-12-13 18:03:51
 * @LastEditors: Envy
 * @LastEditTime: 2019-12-13 18:05:43
 * @Description: Do no edit
 */
import { AxiosTransformer } from '../types'

export default function transform(data: any, headers: any, fns?:AxiosTransformer | AxiosTransformer[]): any {
  if(!fns){
    return data
  }
  if(!Array.isArray(fns)){
    fns = [fns]
  }
  fns.forEach(fn => {
    data = fn(data,headers);
  })
  return data;
}
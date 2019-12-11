/*
 * @Author: Envy
 * @Date: 2019-12-04 16:43:09
 * @LastEditors: Envy
 * @LastEditTime: 2019-12-11 11:21:32
 * @Description: Do no edit
 */
const toString = Object.prototype.toString;

export function isDate(val:any):val is Date{
  return toString.call(val) === '[Object Date]'
}

export function isPlainObject (val:any) :val is Object{
  console.log('val :', val);
  return toString.call(val) === '[object Object]';
}

export function extend<T,U>(to:T, from:U):T & U{
  for(const key in from){
    ;(to as T & U)[key] = from[key] as any
  }
  return to as T & U;
}
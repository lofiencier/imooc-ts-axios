/*
 * @Author: Envy
 * @Date: 2019-12-13 15:21:58
 * @LastEditors: Envy
 * @LastEditTime: 2019-12-13 15:49:56
 * @Description: Do no edit
 */
import { AxiosRequestConfig } from '../types'
import { isPlainObject } from '../helpers/utils';

const strats = Object.create(null);

function defaultStrat(val1: any, val2: any){
  return typeof val2 !== 'undefined' ? val2 : val1;
}

function fromVal2Strat(val1 :any, val2: any): any{
  if(typeof val2 !== 'undefined'){
    return val2;
  }
}

function deepMergeStrat(val1: any, val2: any): any{
  if(isPlainObject(val2)){
    return deepMerge(val1, val2);
  } else if (typeof val2 !== 'undefined') {
    return val2
  } else if (isPlainObject(val1)) {
    return deepMerge(val1)
  } else if(typeof val1 !== 'undefined') {
    return val1
  }
}
const stratKeysDeepMerge = ['headers']

stratKeysDeepMerge.forEach(key => {
  strats[key] = deepMergeStrat
})

const stratKeysFromVal2 = ['url', 'params', 'data'];

stratKeysFromVal2.forEach(key => {
  strats[key] = fromVal2Strat;
});


export default function mergeConfig(config1:AxiosRequestConfig,config2?:AxiosRequestConfig): AxiosRequestConfig{
  if(!config2) {
    config2 = {}
  }
  const config = Object.create(null);

  for(let key in config2){
    mergeField(key);
  }

  for(let key in config1){
    mergeField(key)
  }
  function mergeField(key: string): void {
    const strat = strats[key] || defaultStrat;
    config[key] = strat(config1[key], config2![key])
  }
  return config;
}

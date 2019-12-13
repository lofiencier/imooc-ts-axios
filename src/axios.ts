/*
 * @Author: Envy
 * @Date: 2019-12-11 11:20:15
 * @LastEditors: Envy
 * @LastEditTime: 2019-12-13 15:20:27
 * @Description: Do no edit
 */
import { AxiosInstance, AxiosRequestConfig } from './types'
import Axios from './core/Axios'
import defaults from './defaults'
import { extend } from './helpers/utils'

function createInstance(config: AxiosRequestConfig): AxiosInstance {
  const context = new Axios(config);
  const instance = Axios.prototype.request.bind(context)

  extend(instance, context)

  return instance as AxiosInstance
}

const axios = createInstance(defaults);

export default axios
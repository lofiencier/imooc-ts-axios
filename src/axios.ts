/*
 * @Author: Envy
 * @Date: 2019-12-11 11:20:15
 * @LastEditors: Envy
 * @LastEditTime: 2019-12-11 11:21:41
 * @Description: Do no edit
 */
import { AxiosInstance } from './types'
import Axios from './core/Axios'
import { extend } from './helpers/utils'

function createInstance(): AxiosInstance {
  const context = new Axios()
  const instance = Axios.prototype.request.bind(context)

  extend(instance, context)

  return instance as AxiosInstance
}

const axios = createInstance()

export default axios
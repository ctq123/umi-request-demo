import md5 from 'md5'

import { RequestConfig } from './interface'

/**
 * 加密方法
 *
 * @returns {string}
 *
 */
function parseToken(params: object, secretKey: string): string {
  let paramsToken = Object.keys(params || {})
    .sort()
    .reduce((acc, currentKey) => {
      let currentVal = params[currentKey]

      // 修复序列化值为undefined会丢失的问题
      if (currentVal === undefined) return acc

      if (Number.isNaN(currentVal)) {
        currentVal = ''
      }

      if (Array.isArray(currentVal)) {
        if (currentVal.length === 0) return `${acc}${currentKey}`
        const currentValToString = currentVal
          .sort()
          .map(val => (val instanceof Object ? JSON.stringify(val) : val))
          .reduce((acc = '', current) => acc + (acc ? ',' : '') + current)

        return `${acc}${currentKey}${currentValToString}`
      }

      if (currentVal instanceof Object) {
        return acc + currentKey + JSON.stringify(currentVal)
      }

      return acc + currentKey + currentVal.toString()
    }, '')

  paramsToken += secretKey

  return <string>md5(paramsToken)
}

function addNoSign(config: RequestConfig): RequestConfig {
  config.url =
    config.url.indexOf('?') > -1
      ? config.url + `&noSign=true`
      : config.url + `?noSign=true`

  return config
}

/**
 * @description: 请求拦截器加上sign方法
 * @param {type}
 * @return:
 */
function addSign(
  config: RequestConfig,
  secretKey: string
): RequestConfig {
  const { options } = config
  const { data, params, du } = options
  // 优先获取自定义生成sign函数
  const generateSign = du && du.generateSign ? du.generateSign : parseToken
  const sign = options.method === 'post'
    ? generateSign(data, secretKey)
    : generateSign(params, secretKey)
  if (options.method === 'post') {
    config.url += `?sign=${sign}`
  } else {
    config.options.params['sign'] = sign
  }

  return config
}

export default { addSign, addNoSign }

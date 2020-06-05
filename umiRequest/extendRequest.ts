import { 
  extend,
  RequestMethod,
} from 'umi-request'
import { GlobalHttpOptions, RequestConfig, HttpOptions } from './interface'
import signs from './signs'
import { filterInvalidProperty } from './util'

/**
 * 添加签名sign
 * @param config 
 */
function setSignBeforeRequest(config: RequestConfig): RequestConfig {
  let { url, options } = config
  if (options.du && options.du.secretKey) {
    if (options.noSign || options.du.noSign) {// 单个请求的noSign或者全局noSign
      config = signs.addNoSign({ url, options })
    } else {
      // 统一加sign
      config = signs.addSign({ url, options }, options.du.secretKey)
    }
  }
  return config
}

/**
 * 过滤参数无效属性值
 * @param config 
 */
function filterInvalidParamsBeforeRequest(config: RequestConfig): RequestConfig {
  const { url, options } = config
  const { du, data, params } = options
  // 是否需要过滤无效属性值
  if (options.filterInvalidParams === true || 
    (options.filterInvalidParams !== false && du && du.filterInvalidParams)
    ) {
    // 过滤无效属性值集合
    let invalidParams = ['', undefined, null]
    if (options.invalidParams && options.invalidParams.length) {// 针对特殊情况，过滤自定义集合
      invalidParams = options.invalidParams
    }
    // 默认过滤['', undefined, null]
    const dataType = Object.prototype.toString.call(data)
    const paramsType = Object.prototype.toString.call(params)
    if (dataType === '[object Object]') {
      filterInvalidProperty(options.data, invalidParams)
    } else if (paramsType === '[object Object]') {
      filterInvalidProperty(options.params, invalidParams)
    }
  }
  return {
    url,
    options
  }
}

/**
 * 创建extend实例
 * @param options 
 */
function createExtendRequestInstance(options: GlobalHttpOptions): RequestMethod {
  const { du, ...extendOptions } = options
  const extendRequest: RequestMethod = extend({
    ...extendOptions,
  })

  // request拦截器
  extendRequest.interceptors.request.use((url: string, options: HttpOptions) => {
    let config = { url, options }
    // 改变options.params或options.data，过滤无效属性值
    config = filterInvalidParamsBeforeRequest(config)
    // 改变url或options，添加sign
    config = setSignBeforeRequest(config)
    // 剔除自定义属性
    const { url: newUrl, options: newOptions } = config
    const { 
      url: originUrl,
      noSign,
      msg,
      showSuccessTips,
      filterInvalidParams,
      invalidParams,
      du,
      ...umiOptions
    } = newOptions
    // 返回umi-request的原生配置
    return {
      url: newUrl,
      umiOptions,
    }
  })

  return extendRequest
}

export default createExtendRequestInstance
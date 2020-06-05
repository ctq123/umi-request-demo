import { 
  RequestOptionsInit,
  ResponseError,
  RequestMethod,
} from 'umi-request'

interface DuConfig {
  secretKey: string
  headerTokenName?: string
  noSign?: boolean
  // 是否需要过滤无效属性值，默认['', undefined, null]（针对普遍情况）
  filterInvalidParams: boolean,
  successCallback?: (any: any, DuHttpOptions: SingleHttpOptions) => void
  errorCallback?: (
    options: SingleHttpOptions,
    ResponseError: ResponseError
  ) => void
  // 自定义生成sign函数
  generateSign?: (params: object, secretKey: string) => string
}

/**
 * 单个请求的配置项
 *
 * @export
 * @interface SingleHttpOptions
 * @template T
 */
export interface SingleHttpOptions extends RequestOptionsInit {
  url?: string
  noSign?: boolean
  showSuccessTips: boolean
  msg?: string
  // 是否需要过滤无效属性值（针对特殊情况）
  filterInvalidParams: boolean,
  // 无效属性值集合，默认['', undefined, null]（针对特殊情况）
  invalidParams: Array<any>,
}

/**
 * 初始化的配置项
 */
export interface GlobalHttpOptions extends RequestOptionsInit {
  du?: DuConfig
}

/**
 * SingleHttpOptions和GlobalHttpOptions的集合
 */
export interface HttpOptions extends RequestOptionsInit {
  url?: string
  noSign?: boolean
  showSuccessTips: boolean
  msg?: string
  filterInvalidParams: boolean,
  invalidParams: Array<any>,
  du?: DuConfig
}

export interface RequestConfig {
  url: string,
  options: HttpOptions
}

export interface SignParams {
  [key: string]: any
}

export declare function request<R = any>(
  options: SingleHttpOptions
): Promise<R>

export declare function requestInit(options: GlobalHttpOptions): RequestMethod

interface ServiceExport {
  request: typeof request
  requestInit: typeof requestInit
}

declare const ServiceExport: ServiceExport

export default ServiceExport

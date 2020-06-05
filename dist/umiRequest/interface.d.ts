import { RequestOptionsInit, ResponseError, RequestMethod } from 'umi-request';
interface DuConfig {
    secretKey: string;
    headerTokenName?: string;
    noSign?: boolean;
    filterInvalidParams: boolean;
    successCallback?: (any: any, DuHttpOptions: SingleHttpOptions) => void;
    errorCallback?: (options: SingleHttpOptions, ResponseError: ResponseError) => void;
    generateSign?: (params: object, secretKey: string) => string;
}
/**
 * 单个请求的配置项
 *
 * @export
 * @interface SingleHttpOptions
 * @template T
 */
export interface SingleHttpOptions extends RequestOptionsInit {
    url: string;
    noSign?: boolean;
    showSuccessTips: boolean;
    msg?: string;
    filterInvalidParams: boolean;
    invalidParams: Array<any>;
}
/**
 * 初始化的配置项
 */
export interface GlobalHttpOptions extends RequestOptionsInit {
    du?: DuConfig;
}
/**
 * SingleHttpOptions和GlobalHttpOptions的集合
 */
export interface HttpOptions extends RequestOptionsInit {
    url?: string;
    noSign?: boolean;
    showSuccessTips: boolean;
    msg?: string;
    filterInvalidParams: boolean;
    invalidParams: Array<any>;
    du?: DuConfig;
}
export interface RequestConfig {
    url: string;
    options: HttpOptions;
}
export interface SignParams {
    [key: string]: any;
}
export declare function request<R = any>(options: SingleHttpOptions): Promise<R>;
export declare function requestInit(options: GlobalHttpOptions): RequestMethod;
interface ServiceExport {
    request: typeof request;
    requestInit: typeof requestInit;
}
declare const ServiceExport: ServiceExport;
export default ServiceExport;

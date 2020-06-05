import { RequestConfig } from './interface';
declare function addNoSign(config: RequestConfig): RequestConfig;
/**
 * @description: 请求拦截器加上sign方法
 * @param {type}
 * @return:
 */
declare function addSign(config: RequestConfig, secretKey: string): RequestConfig;
declare const _default: {
    addSign: typeof addSign;
    addNoSign: typeof addNoSign;
};
export default _default;

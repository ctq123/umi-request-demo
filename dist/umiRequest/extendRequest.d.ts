import { RequestMethod } from 'umi-request';
import { GlobalHttpOptions } from './interface';
/**
 * 创建extend实例
 * @param options
 */
declare function createExtendRequestInstance(options: GlobalHttpOptions): RequestMethod;
export default createExtendRequestInstance;

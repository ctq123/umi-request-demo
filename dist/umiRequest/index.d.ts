import { GlobalHttpOptions, SingleHttpOptions } from './interface';
import { RequestMethod, RequestResponse } from 'umi-request';
declare const _default: {
    requestInit(options: GlobalHttpOptions): RequestMethod;
    request<T = any, R = any>(options: SingleHttpOptions): Promise<RequestResponse<R>>;
};
export default _default;

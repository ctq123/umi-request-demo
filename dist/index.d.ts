import Service from './umiRequest';
export { Service };
declare const _default: {
    Service: {
        requestInit(options: import("./umiRequest/interface").GlobalHttpOptions): import("umi-request").RequestMethod<false>;
        request<T = any, R = any>(options: import("./umiRequest/interface").SingleHttpOptions): Promise<import("umi-request").RequestResponse<R>>;
    };
};
export default _default;

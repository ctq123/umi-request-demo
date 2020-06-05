"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var umi_request_1 = require("umi-request");
var signs_1 = require("./signs");
var util_1 = require("./util");
/**
 * 添加签名sign
 * @param config
 */
function setSignBeforeRequest(config) {
    var url = config.url, options = config.options;
    if (options.du && options.du.secretKey) {
        if (options.noSign || options.du.noSign) { // 单个请求的noSign或者全局noSign
            config = signs_1.default.addNoSign({ url: url, options: options });
        }
        else {
            // 统一加sign
            config = signs_1.default.addSign({ url: url, options: options }, options.du.secretKey);
        }
    }
    return config;
}
/**
 * 过滤参数无效属性值
 * @param config
 */
function filterInvalidParamsBeforeRequest(config) {
    var url = config.url, options = config.options;
    var du = options.du, data = options.data, params = options.params;
    // 是否需要过滤无效属性值
    if (options.filterInvalidParams === true ||
        (options.filterInvalidParams !== false && du && du.filterInvalidParams)) {
        // 过滤无效属性值集合
        var invalidParams = ['', undefined, null];
        if (options.invalidParams && options.invalidParams.length) { // 针对特殊情况，过滤自定义集合
            invalidParams = options.invalidParams;
        }
        // 默认过滤['', undefined, null]
        var dataType = Object.prototype.toString.call(data);
        var paramsType = Object.prototype.toString.call(params);
        if (dataType === '[object Object]') {
            util_1.filterInvalidProperty(options.data, invalidParams);
        }
        else if (paramsType === '[object Object]') {
            util_1.filterInvalidProperty(options.params, invalidParams);
        }
    }
    return {
        url: url,
        options: options
    };
}
/**
 * 创建extend实例
 * @param options
 */
function createExtendRequestInstance(options) {
    var du = options.du, extendOptions = __rest(options, ["du"]);
    var extendRequest = umi_request_1.extend(__assign({}, extendOptions));
    // request拦截器
    extendRequest.interceptors.request.use(function (url, options) {
        var config = { url: url, options: options };
        // 改变options.params或options.data，过滤无效属性值
        config = filterInvalidParamsBeforeRequest(config);
        // 改变url或options，添加sign
        config = setSignBeforeRequest(config);
        // 剔除自定义属性
        var newUrl = config.url, newOptions = config.options;
        var originUrl = newOptions.url, noSign = newOptions.noSign, msg = newOptions.msg, showSuccessTips = newOptions.showSuccessTips, filterInvalidParams = newOptions.filterInvalidParams, invalidParams = newOptions.invalidParams, du = newOptions.du, umiOptions = __rest(newOptions
        // 返回umi-request的原生配置
        , ["url", "noSign", "msg", "showSuccessTips", "filterInvalidParams", "invalidParams", "du"]);
        // 返回umi-request的原生配置
        return {
            url: newUrl,
            umiOptions: umiOptions,
        };
    });
    return extendRequest;
}
exports.default = createExtendRequestInstance;

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
Object.defineProperty(exports, "__esModule", { value: true });
var extendRequest_1 = require("./extendRequest");
exports.default = (function () {
    var globalHttpOption = {};
    var umiInstance = null;
    function startFetch(options) {
        return new Promise(function (resolve, reject) {
            if (!umiInstance) {
                return reject(new Error('请先进行实例化操作requestInit'));
            }
            var newOptions = __assign(__assign({}, globalHttpOption), options);
            // 传递含有自定义属性的newOptions进去，在拦截器中会删除自定义属性，只保留umi-request原生属性
            return umiInstance[options.method](options.url, newOptions)
                .then(function (resp) {
                if (globalHttpOption.du &&
                    typeof globalHttpOption.du.successCallback === 'function') {
                    globalHttpOption.du.successCallback(resp, options);
                }
                resolve(resp);
            }).catch(function (error) {
                // 兼容处理（errorHandler和globalHttpOption.du.errorCallback）,防止重复进行错误处理
                // globalHttpOption.errorHandler优先级高于globalHttpOption.du.errorCallback
                if (!globalHttpOption.errorHandler &&
                    globalHttpOption.du &&
                    typeof globalHttpOption.du.errorCallback === 'function') {
                    globalHttpOption.du.errorCallback(options, error);
                }
                reject(error);
            });
        });
    }
    return {
        requestInit: function (options) {
            if (!umiInstance)
                umiInstance = extendRequest_1.default(options);
            if (options)
                globalHttpOption = options;
            // 这里返回与否意义不大，request内部会直接使用umiInstance实例
            return umiInstance;
        },
        request: function (options) {
            return startFetch(options);
        }
    };
})();

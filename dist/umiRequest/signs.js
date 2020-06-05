"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var md5 = require("md5");
/**
 * 加密方法
 *
 * @returns {string}
 *
 */
function parseToken(params, secretKey) {
    var paramsToken = Object.keys(params || {})
        .sort()
        .reduce(function (acc, currentKey) {
        var currentVal = params[currentKey];
        // 修复序列化值为undefined会丢失的问题
        if (currentVal === undefined)
            return acc;
        if (Number.isNaN(currentVal)) {
            currentVal = '';
        }
        if (Array.isArray(currentVal)) {
            if (currentVal.length === 0)
                return "" + acc + currentKey;
            var currentValToString = currentVal
                .sort()
                .map(function (val) { return (val instanceof Object ? JSON.stringify(val) : val); })
                .reduce(function (acc, current) {
                if (acc === void 0) { acc = ''; }
                return acc + (acc ? ',' : '') + current;
            });
            return "" + acc + currentKey + currentValToString;
        }
        if (currentVal instanceof Object) {
            return acc + currentKey + JSON.stringify(currentVal);
        }
        return acc + currentKey + currentVal.toString();
    }, '');
    paramsToken += secretKey;
    return md5(paramsToken);
}
function addNoSign(config) {
    config.url =
        config.url.indexOf('?') > -1
            ? config.url + "&noSign=true"
            : config.url + "?noSign=true";
    return config;
}
/**
 * @description: 请求拦截器加上sign方法
 * @param {type}
 * @return:
 */
function addSign(config, secretKey) {
    var options = config.options;
    var data = options.data, _a = options.params, params = _a === void 0 ? {} : _a, du = options.du, method = options.method;
    var dataType = Object.prototype.toString.call(data);
    var paramsType = Object.prototype.toString.call(params);
    // 优先获取自定义生成sign函数
    var generateSign = du && du.generateSign ? du.generateSign : parseToken;
    if (dataType === '[object Object]') {
        var sign = generateSign(data, secretKey);
        config.url += "?sign=" + sign;
    }
    else if (paramsType === '[object Object]') {
        var sign = generateSign(params, secretKey);
        config.options.params['sign'] = sign;
    }
    return config;
}
exports.default = { addSign: addSign, addNoSign: addNoSign };

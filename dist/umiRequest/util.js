"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterInvalidProperty = void 0;
/**
 * 过滤无效属性
 * @param data
 * @param invalidArr
 */
exports.filterInvalidProperty = function (data, invalidArr) {
    if (invalidArr === void 0) { invalidArr = ['', undefined, null]; }
    if (data) {
        for (var k in data) {
            if (typeof data[k] === 'string') { // 字符串剔除前后空格
                data[k] = data[k].trim();
            }
            if (invalidArr.includes(data[k])) { // 剔除属性
                delete data[k];
            }
        }
    }
};

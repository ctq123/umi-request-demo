
/**
 * 过滤无效属性
 * @param data 
 * @param invalidArr 
 */
export const filterInvalidProperty = (data: object, invalidArr: Array<any> = ['', undefined, null]) => {
  if (data) {
    for(let k in data) {
      if (typeof data[k] === 'string') {// 字符串剔除前后空格
        data[k] = data[k].trim()
      }
      if (invalidArr.includes(data[k])) {// 剔除属性
        delete data[k]
      }
    }
  }
}

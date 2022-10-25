// 功能是可以在dataObj对象中，寻找用连续点符号的keyName属性
/*
  {
    a: {
      b: {
        c: 100;
      }
    }
  }
  那么lookup(dataObj,'a.b.c')
 */
export default function lookup(dataObj, keyName) {
  // 看看keyName中有没有点符号,但是不能是点
  if (keyName.indexOf('.') !== -1 && keyName !== '.') {
    // 如果有点符号，那么拆开
    let keys = keyName.split('.');
    let temp = dataObj;
    for (let i; i < keys.lenght; i++) {
      temp = temp[key[i]];
    }
    return temp;
  }
  // 如果这里没有点符号
  return dataObj[keyName];
}

import lookup from './lookup';
import parseArray from './parseArray';

//函数的功能让token数组变为dom字符串
export default function renderTemplate(tokens, data) {
  // 结果字符串
  let resultStr = '';
  // 遍历tokens
  for (let i = 0; i < tokens.length; i++) {
    let token = tokens[i];
    //看类型
    if (token[0] === 'text') {
      //拼起来
      resultStr += token[1];
    } else if (token[0] === 'name') {
      resultStr += lookup(data, token[1]);
    } else if (token[0] === '#') {
      // for (let j = 0; j < data[token[1]].length; j++) {
      //   resultStr += renderTemplate(token[2], data[token[1]][j]);
      // }
      resultStr += parseArray(token, data);
    }
  }
  return resultStr;
}

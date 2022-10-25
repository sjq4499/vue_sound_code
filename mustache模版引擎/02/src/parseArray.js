/*
  处理数组，结合renderTemplate实现递归
  注意，这个函数收到参数是token 而不是tokens
  token是什么，就是一个简单的['#','students',[]]
  这个函数要递归调用renderTemplate 函数 ，调用多少次是由data决定的
 */
import renderTemplate from './renderTemplate';
import lookup from './lookup';

export default function parseArray(token, data) {
  // 得到整体数据data中这个数组要使用的部分
  let v = lookup(data, token[1]);
  // 结果字符串
  let resultStr = '';
  // 遍历v数组，v一定是数组
  // 注意，下面这个循环可能是整个包中最难思考的一个循环
  // 他是遍历数据，而不是遍历tokens，数组中的数据有几条，就遍历几条
  for (let i = 0; i < v.length; i++) {
    // 这里要补一个'.'属性
    resultStr += renderTemplate(token[2], { '.': v[i], ...v[i] });
  }

  return resultStr;
}

import Scanner from './Scanner';
import nestTokens from './nestTokens';

// 将模版字符串变为tokens数组
export default function parseTemplateToTokens(templateStr) {
  var tokens = [];
  // 创建扫描器
  var scanner = new Scanner(templateStr);
  let words;
  // 让扫描器工作
  while (!scanner.eos()) {
    // 手机开始标记出现之前的文字
    words = scanner.scanUtil('{{');
    if (words !== '') {
      // 存起来,去掉空格
      // 标签中的空格不能去掉，比如<div class="box">不能去掉class前面的空格
      let isInJJH = false;
      let _words = '';
      for (let i = 0; i < words.length; i++) {
        // 判断是否在标签里
        if (words[i] === '<') {
          isInJJH = true;
        } else if (words[i] === '>') {
          isInJJH = false;
        }

        // 如果这项不是空格
        //如果这项是空格，只有当它在标签内的时候，才拼接
        if (!/\s/.test(words[i]) || isInJJH) {
          _words += words[i];
        }
      }
      tokens.push(['text', _words]);
    }
    // 过双大括号
    scanner.scan('{{');

    // 手机开始标记出现之前的文字
    words = scanner.scanUtil('}}');
    if (words !== '') {
      // 这个words就是{{}}中间的东西，判断一下首字符
      // 存起来

      switch (words[0]) {
        case '#':
          // 从1开始 因为首字符是#
          tokens.push(['#', words.substring(1)]);
          break;
        case '/':
          // 从1开始 因为首字符是/
          tokens.push(['/', words.substring(1)]);
          break;
        default:
          tokens.push(['name', words]);
      }
    }
    // 过双大括号
    scanner.scan('}}');
  }

  // 返回折叠收集的tokens
  return nestTokens(tokens);
}

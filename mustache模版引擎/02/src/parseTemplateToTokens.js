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
      // 存起来
      tokens.push(['text', words]);
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

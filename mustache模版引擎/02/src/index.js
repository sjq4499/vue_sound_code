// import Scanner from './Scanner';
import parseTemplateToTokens from './parseTemplateToTokens.js';

//全局提供templateEngine对象
window.templateEngine = {
  // 渲染方法
  render(templateStr, data) {
    //
    let tookens = parseTemplateToTokens(templateStr, data);
    console.log(tookens);

    // // 实例一个扫描器，构造时候提供一个参数，这个参数就是模版字符串
    // // 也就是说这个扫描器就是针对这个模版字符串工作的
    // console.log(templateStr, data, 'templateStr, data');
    // var scanner = new Scanner(templateStr);
    // // 测试scanUtil
    // // let word = scanner.scanUtil('{{');
    // // console.log(scanner.pos);
    // // console.log(word);
    // // scanner.scan('{{');
    // // console.log(scanner.pos);
    // // 当sanner没有到头
    // while (!scanner.eos()) {
    //   let word = scanner.scanUtil('{{');
    //   console.log(word);
    //   scanner.scan('{{');
    //   word = scanner.scanUtil('}}');
    //   scanner.scan('}}');
    //   console.log(word);
    // }
  },
};

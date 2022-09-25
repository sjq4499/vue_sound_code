// 函数的功能 折叠tokens，将#和/之间的tokens能够整合起来，作为它的下标微3的项

export default function nestTokens(tokens) {
  let nestedTokens = [];

  // 栈结构，存放小tokens，栈顶（靠近端口的，最新进入的）的tokens数组中当前操作的这个tokens小数组
  let sections = [];
  //收集器，天生指向nestedTokens 结果数组，引用类型，所以指向的是同一个数组
  // 收集器的指向会变化，当遇见#的时候，收集器会指向token下标为2的新数组
  let collector = nestedTokens;

  for (let i = 0; i < tokens.length; i++) {
    let token = tokens[i];

    switch (token[0]) {
      case '#':
        // 收集器中放入token
        collector.push(token);

        // 压栈(入栈)
        sections.push(token);
        // 收集器要换人 给这个token添加下标为2的项，并且收集器指向它
        collector = token[2] = [];
        break;
      case '/':
        // 出栈 pop会返回刚刚弹出的项
        let section_pop = sections.pop();

        // 改变收集器为栈结构队尾（队尾是栈顶）那项的下标为2的数组
        collector =
          sections.length > 0 ? sections[sections.length - 1][2] : nestedTokens;
        break;
      default:
        // 不管当前的collector是谁，可能是结果nestedToken，可能也是某个token的下标为2的数组，不管谁推入collector即可
        collector.push(token);

        break;
    }
  }

  return nestedTokens;
}

// export default function nestTokens(tokens) {
//   let nestedTokens = [];
//   // 栈结构，存放小tokens，栈顶（靠近端口的，最新进入的）的tokens数组中当前操作的这个tokens小数组
//   let sections = [];
//   for (let i = 0; i < tokens.length; i++) {
//     let token = tokens[i];
//     switch (token[0]) {
//       case '#':
//         // 给这个token下标微2的项创建一个数组，以收集子元素
//         token[2] = [];
//         // 压栈(入栈)
//         sections.push(token);
//         nestedTokens.push(token);
//         break;
//       case '/':
//         // 出栈 pop会返回刚刚弹出的项
//         let section = sections.pop();
//         // 刚刚弹出的项还没加入到结果数组中
//         nestedTokens.push(section);
//         break;
//       default:
//         // 判断 栈队列当前情况
//         if (sections.length === 0) {
//           nestedTokens.push(token);
//         } else {
//           sections[sections.length - 1][2].push(token);
//         }
//         break;
//     }
//   }
//   return nestedTokens;
// }

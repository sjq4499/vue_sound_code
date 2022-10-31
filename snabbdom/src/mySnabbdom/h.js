import vnode from './vnode';

/**
 * 低配版本的h函数，这个函数必须接受3个参数，缺一不可
 * 相当于它的重载功能较弱
 * 也就是说，调用的时候必须是以下三种之一
 * h('div',{},'文字‘)
 * h('div',{},[])
 * h('div',{},h())
 *
 */

export default function (sel, data, c) {
  // 检查参数的个数
  if (arguments.length !== 3) {
    throw new Error('对不起，h函数必须传3个函数，这是一个低配版的h函数');
  }
  // 检查参数c的类型
  if (typeof c === 'string' || typeof c === 'number') {
    //说明现在调用h函数是形态1
    return vnode(sel, data, undefined, c, undefined);
  } else if (Array.isArray(c)) {
    //说明现在调用h函数是形态2
    let children = [];
    // 遍历c
    for (let i = 0; i < c.length; i++) {
      // 检查c[i]必须是一个对象
      if (!(typeof c[i] === 'object' || c[i].hasOwProperty('sel'))) {
        throw new Error('传入的数组参数中有的项不是h函数');
        // 这里不需要执行c[i],因为测试语句中已经执行了
      } else {
        children.push(c[i]);
      }
    }
    // 循环结束，children收集完毕，此时返回虚拟节点，它的children属性
    return vnode(sel, data, children, undefined, undefined);
  } else if (typeof c === 'object' || c.hasOwProperty('sel')) {
    //说明现在调用h函数是形态3
    // 即 传入的c是唯一的children，不用执行c，因为测试语句中已经存在
    let children = [c];
    return vnode(sel, data, children, c, undefined);
  } else {
    throw new Error('传入的第三个参数类型不对');
  }
}

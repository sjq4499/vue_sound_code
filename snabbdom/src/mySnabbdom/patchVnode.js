import creatElement from './creatElement';

export default function (newVnode, oldVnode) {
  // 判断新旧vnode是否是同一个
  if (oldVnode === newVnode) return;
  // 判断newVnode有没有text
  if (
    newVnode.text !== undefined &&
    (newVnode.children == undefined || newVnode.children.length == 0)
  ) {
    // 新节点有text
    console.log('新节点有text');
    if (newVnode.text !== oldVnode.text) {
      // 如果新虚拟节点中的text和老的虚拟节点的text不同，那么直接让新的text写入老的elm中即可，如果老的elm中的是children，那么也会立即消失
      oldVnode.elm.innerText = newVnode.text;
    }
  } else {
    // 新节点没有text
    console.log('新节点没有text');
    // 判断老的节点有没有children
    // 所有未处理的节点的开头
    let un = 0;
    if (oldVnode.children !== undefined && oldVnode.children.length > 0) {
      // 老的有children，此时就是最复杂的情况，就是新老都有children
    } else {
      // 老的没有children,新的有children
      // 清空老的节点的内容
      oldVnode.elm.innerText = '';
      // 遍历新的vnode的子节点，创建DOM 上树
      for (let i = 0; i < newVnode.children.length; i++) {
        let dom = creatElement(newVnode.children[i]);
        oldVnode.elm.appendChild(dom);
      }
    }
  }
}

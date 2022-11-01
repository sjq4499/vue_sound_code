import vnode from './vnode';
import creatElement from './creatElement';

export default function (oldVnode, newVnode) {
  // 判断传入的第一个参数，是Dom节点还是虚拟节点
  if (oldVnode.sel == '' || oldVnode.sel == undefined) {
    //传入的第一个参数是Dom节点，此时要包装为虚拟节点
    oldVnode = vnode(
      oldVnode.tagName.toLowerCase(),
      {},
      [],
      undefined,
      oldVnode
    );
  }
  // 判断oldVnode和newNode是不是同一个节点
  if (oldVnode.key == newVnode.key && oldVnode.sel == newVnode.sel) {
    console.log('是一个节点');
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
  } else {
    console.log('不是同一个节点，暴力插入一个新的节点，删除旧的');
    let newVnodeElm = creatElement(newVnode);
    //  插入到老节点之前
    if (oldVnode.elm && newVnodeElm) {
      oldVnode.elm.parentNode.insertBefore(newVnodeElm, oldVnode.elm);
    }
    // 删除老节点
    oldVnode.elm.parentNode.removeChild(oldVnode.elm);
  }
}

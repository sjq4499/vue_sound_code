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
  } else {
    console.log('不是同一个节点，暴力插入一个新的节点，删除旧的');
    let newVnodeElm = creatElement(newVnode, oldVnode.elm);
    //  插入到老节点之前
    if (oldVnode.elm && newVnodeElm) {
      oldVnode.elm.parentNode.insertBefore(newVnodeElm, oldVnode.elm);
    }
    // 删除老节点
    oldVnode.elm.parentNode.removeChild(oldVnode.elm);
  }
}

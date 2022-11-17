import patchVnode from './patchVnode';
import creatElement from './creatElement';
// 判断是同一个虚拟节点
function checkSameVnode(a, b) {
  return a.sel == b.sel && a.key == b.key;
}

export default function updateChildren(parentElm, oldCh, newCh) {
  console.log(parentElm, oldCh, newCh, 'parentElm, oldCh, newCh');
  // 旧前
  let oldstartIndex = 0;
  // 新前
  let newstartIndex = 0;
  // 旧后
  let oldEndIndex = oldCh.length - 1;
  // 新后
  let newEndIndex = newCh.length - 1;
  // 旧前节点
  let oldstartVnode = oldCh[0];
  // 旧后节点
  let oldEndVnode = oldCh[oldEndIndex];
  // 新前节点
  let newstartVnode = newCh[0];
  //新后节点
  let newEndVnode = newCh[newEndIndex];

  let keymap = null;
  //
  while (oldstartIndex <= oldEndIndex && newstartIndex <= newEndIndex) {
    console.log('$$$$$');
    // 首先判断是不是已经标记undefinde
    if (oldstartVnode == undefined || oldCh[oldstartIndex] == undefined) {
      oldstartVnode = oldCh[++oldstartIndex];
    } else if (oldEndVnode == undefined || oldCh[oldEndIndex] == undefined) {
      oldEndVnode = oldCh[--oldEndIndex];
    } else if (
      newstartVnode == undefined ||
      newCh[newstartIndex] == undefined
    ) {
      newstartVnode = newCh[++newstartIndex];
    } else if (newEndVnode == undefined || newCh[newEndIndex] == undefined) {
      newEndVnode = newCh[--newEndIndex];
    }
    if (checkSameVnode(oldstartVnode, newstartVnode)) {
      console.log('11111旧前与新前');
      // 旧前与新前
      patchVnode(oldstartVnode, newstartVnode);
      // 指针后移
      oldstartVnode = oldCh[++oldstartIndex];
      newstartVnode = newCh[++newstartIndex];
    } else if (checkSameVnode(oldEndVnode, newEndVnode)) {
      console.log('2222旧后与新后');
      // 旧后与新后
      patchVnode(oldEndVnode, newEndVnode);
      // 指针前移
      oldEndVnode = oldCh[--oldEndIndex];
      newEndVnode = newCh[--newEndIndex];
    } else if (checkSameVnode(oldstartVnode, newEndVnode)) {
      console.log('3333旧前与新后');
      // 旧前与新后
      patchVnode(oldstartVnode, newEndVnode);
      // 此时移动节点，移动新后指向的这个节点到老节点的旧后的后面
      parentElm.insertBefore(oldstartVnode.elm, oldEndVnode.elm.nextSibling);
      // 移动指针
      oldstartVnode = oldCh[++oldstartIndex];
      newEndVnode = newCh[--newEndIndex];
    } else if (checkSameVnode(oldEndVnode, newstartVnode)) {
      console.log('4444旧后与新前');
      // 旧后与新前
      patchVnode(oldEndVnode, newstartVnode);
      // 此时移动节点，移动新前指向的这个节点到老节点的旧前的后面
      parentElm.insertBefore(oldEndVnode.elm, oldstartVnode.elm);
      // 移动指针
      oldEndVnode = oldCh[--oldEndIndex];
      newstartVnode = newCh[++newstartIndex];
    } else {
      // 四种命中都没命中
      // 寻找key的map
      if (!keymap) {
        keymap = {};
        for (let i = oldstartIndex; i <= oldEndIndex; i++) {
          const key = oldCh[i].key;
          if (key != undefined) {
            keymap[key] = i;
          }
        }
      }
      console.log(keymap);
      // 寻找当前这项（newstartindex)这项在keymap中的映射的位置序号
      const idxInold = keymap[newEndVnode.key];
      console.log(idxInold, ';;;');
      // 判断，
      if (!idxInold) {
        // 如果idxiInold 是undefined 表示他是全新的项
        // 被加入的项（就是newstartVnode）现在还不是dom节点
        console.log(newCh, newstartIndex, 'll');
        parentElm.insertBefore(creatElement(newstartVnode), oldstartVnode.elm);
      } else {
        // 如果idxiInold 不是undefined 表示他要移动
        const elmToMove = oldCh[idxInold];
        console.log(elmToMove, 'elmToMove');
        patchVnode(elmToMove, newEndVnode);
        // 把这项设置为undefined,表示已经处理过了
        oldCh[idxInold] = undefined;
        parentElm.insertBefore(elmToMove.elm, oldstartVnode.elm);
      }
      newstartVnode = newCh[++newstartIndex];
    }
  }
  //有没有剩余节点
  // new 还有剩余节点没处理
  if (newstartIndex <= newEndIndex) {
    let before =
      newCh[newEndIndex + 1] == null ? null : newCh[newEndIndex + 1].elm;
    console.log(before);
    // insertbefore方法可以自动识别null,如果是null就会自动排到队尾去，和appendChild是一致的
    // newCh[i]现在还没有真正的dom,所以要吊用createElement()函数变为dom
    for (let i = newstartIndex; i <= newEndIndex; i++) {
      //     -----
      console.log(oldCh, i, oldstartIndex, 'oldCh[i]');
      before = oldCh[oldstartIndex] ? oldCh[oldstartIndex].elm : null;
      parentElm.insertBefore(creatElement(newCh[i]), before);
    }
  } else if (oldstartIndex <= oldEndIndex) {
    // old 还有剩余节点没处理
    // 批量删除oldstartIndex和oldEndIndex指针之间的项
    for (let i = oldstartIndex; i <= oldEndIndex; i++) {
      if (oldCh[i]) {
        parentElm.removeChild(oldCh[i].elm);
      }
    }
  }
}

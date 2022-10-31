// 真正创建节点,将vnode创建为dom，是孤儿节点，不进行插入

export default function (vnode) {
  console.log('目的是把虚拟节点', vnode);
  // 创建一个dom节点，这个节点现在还是孤儿节点
  let domNode = document.createElement(vnode.sel);
  // 有子节点还是文本
  if (
    vnode.text !== '' &&
    (vnode.childen === undefined || vnode.childen.length === 0)
  ) {
    // 他内部是文本
    domNode.innerText = vnode.text;
    // 补充elm属性
    vnode.elm = domNode;
  } else if (Array.isArray(vnode.childen) && vnode.childen.length > 0) {
    //他内部是子节点，就要递归创建节点
  }

  // 返回elm
  return vnode.elm;
}

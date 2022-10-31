import h from './mySnabbdom/h'; // helper function for creating vnodes
import patch from './mySnabbdom/pacth'; // helper function for creating vnodes
let container = document.getElementById('container');

// 创建出patch 函数
// let patch = init([classModule, propsModule, styleModule, eventListenersModule]);

// 创建虚拟节点
var myVnode1 = h(
  'a',
  { props: { href: 'https://www.baidu.com', target: '_blank' } },
  '孙孙孙'
);

patch(container, myVnode1);

// var myVnode2 = h('div', { class: { box: true, box1: false } }, '我是一个盒子');
var myVnode4 = h('div', {}, [
  h('li', {}, 'a'),
  h('li', {}, 'b'),
  h('li', {}, 'c'),
]);

// console.log(myVnode4, 'myVnode4');

// var myVnode3 = h('ul', [
//   h('li', '苹果'),
//   h('li', '西瓜'),
//   h(
//     'li',
//     h('ol', [
//       h('li', '苹果'),
//       h('li', '西瓜'),
//       h('li', '香蕉'),
//       h('li', '火龙果'),
//     ])
//   ),
//   h('li', '火龙果'),
// ]);
// // 让虚拟节点渲染

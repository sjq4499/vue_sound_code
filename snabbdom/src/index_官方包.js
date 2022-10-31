import { init } from 'snabbdom/init';
import { classModule } from 'snabbdom/modules/class';
import { propsModule } from 'snabbdom/modules/props';
import { styleModule } from 'snabbdom/modules/style';
import { eventListenersModule } from 'snabbdom/modules/eventlisteners';
import { h } from 'snabbdom/h'; // helper function for creating vnodes

// 创建出patch 函数
let patch = init([classModule, propsModule, styleModule, eventListenersModule]);

// 创建虚拟节点
var myVnode1 = h(
  'a',
  { props: { href: 'https://www.baidu.com', target: '_blank' } },
  '孙孙孙'
);

var myVnode2 = h('div', { class: { box: true, box1: false } }, '我是一个盒子');

var myVnode3 = h('ul', [
  h('li', '苹果'),
  h('li', '西瓜'),
  h(
    'li',
    h('ol', [
      h('li', '苹果'),
      h('li', '西瓜'),
      h('li', '香蕉'),
      h('li', '火龙果'),
    ])
  ),
  h('li', '火龙果'),
]);
// 让虚拟节点渲染
let container = document.getElementById('container');
patch(container, myVnode3);

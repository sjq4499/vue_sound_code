import { init } from 'snabbdom/init';
import { classModule } from 'snabbdom/modules/class';
import { propsModule } from 'snabbdom/modules/props';
import { styleModule } from 'snabbdom/modules/style';
import { eventListenersModule } from 'snabbdom/modules/eventlisteners';
import { h } from 'snabbdom/h'; // helper function for creating vnodes

// 创建出patch 函数
let patch = init([classModule, propsModule, styleModule, eventListenersModule]);

// 创建虚拟节点

var myVnode4 = h('div', {}, [
  h('li', { key: 'a' }, 'a'),
  h('li', { key: 'b' }, 'b'),
  h('li', { key: 'c' }, 'c'),
]);
var myVnode5 = h('div', {}, [
  h('li', { key: 'd' }, 'd'),
  h('li', { key: 'a' }, 'a'),
  h('li', { key: 'b' }, 'b'),
  h('li', { key: 'c' }, 'c'),
]);
var myVnode6 = h(
  'div',
  {},
  h('ul', {}, [
    h('li', { key: 'd' }, 'd'),
    h('li', { key: 'a' }, 'a'),
    h('li', { key: 'b' }, 'b'),
  ])
);
// 让虚拟节点渲染
let container = document.getElementById('container');
patch(container, myVnode4);

btn.onclick = () => {
  patch(myVnode4, myVnode5);
  patch(myVnode4, myVnode6);
};

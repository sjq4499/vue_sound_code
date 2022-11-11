// 函数的功能 传入五个参数组合成对象返回
export default function (sel, data, children, text, elm) {
  const key = data.key;
  return {
    sel,
    data,
    children,
    text,
    elm,
    key,
  };
}

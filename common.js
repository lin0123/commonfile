/*
* @Author: fwl
* @Date:   2017-05-14 14:19:48
* @Last Modified by:   fwl
* @Last Modified time: 2018-04-19 21:22:13
*/

'use strict';

//移动端响应式屏幕的封装 rem
(function (doc, win) {
  let docEl = doc.documentElement,
  resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
  recalc = function() {
    let clientWidth = docEl.clientWidth;
    if (!clientWidth) return;
    docEl.style.fontSize = 10 * (clientWidth / 640) + 'px';
  };
  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);

//移动端触摸屏点击事件的封装
/**
* [tapTouch description]
* @param  {[type]} node     [传入需要绑定事件的dom元素]
* @param  {[type]} func     [触摸屏点击事件的回调函数]
* @param  {[type]} interval [触摸屏点击的响应时间,即在多久的时间内有效]
* @return {[type]}          [无返回值]
*/
function tapTouch (node, func, interval) {
  let start_time = 0;
  let delay_time = 0;
  let flag = false;
  let intervalTime = interval || 120;
  node.addEventListener('touchstart', function (ev) {
    ev.preventDefault();
    start_time = Date.now();
    flag = false;
  });
  node.addEventListener('touchmove', function (ev) {
    ev.preventDefault();
    flag = true;
  });
  node.addEventListener('touchend', function (ev) {
    ev.preventDefault();
    delay_time = Date.now() - start_time;
    if (delay_time >= intervalTime) {
      return -1;
    }
    if (flag) {
      return -1;
    }
    func(node);
  });
}

//滚轮事件
let wheel = function (event) {
    //滚动数值
    let delta = 0;
    //ie
    if (!event)
      event = window.event;
    //ie+opera
    else if (event.wheelDelta)
      delta = event.wheelDelta / 120;
    //firefox
    else if (event.detail)
      delta =- event.detail / 3;
    if (delta)
      handle(delta);
}

(function () {
    //判断是否支持触摸事件,如果支持则添加触摸屏事件,判断移动触摸屏的效果
    let touchcheck = function () {
    	try {
        //加上这句才有效果 先要创建触摸屏事件
        document.createEvent('TouchEvent');
        document.addEventListener('touchstart', touchstartfunc, false);
        document.addEventListener('touchmove', touchMovefunc, false);
        document.addEventListener('touchend', touchEndfunc, false);
      }
      catch (e) {
        //监听滚轮事件
        if (window.addEventListener) {
        	window.addEventListener('DOMMouseScroll', wheel, false);
        }
        //ie
        window.onmousewheel = document.onmousewheel = wheel;
      }
    }
    //手机上的触摸事件
    let startX = 0;
    let startY = 0;
    function touchstartfunc (ev) {
    	ev.preventDefault();
    	let touch = ev.touches[0];
    	startX = Number(touch.pageX);
    	startY = Number(touch.pageY);
    }
    function touchMovefunc (ev) {
      //阻止触摸时浏览器的缩放、滚动条滚动等 
      ev.preventDefault();
      let touch = ev.touches[0]; //获取第一个触点
      let x = Number(touch.pageX); //页面触点X坐标
      let y = Number(touch.pageY); //页面触点Y坐标
      //判断是向下还是向上移动了
      if (Math.abs(x-startX) < 5 && (y-startY) > 5) {  
      	slide(1);
      }
      else if (Math.abs(x-startX) < 5 && (y-startY) < -5) {
      	slide(-1);
      }
    }
    function touchEndfunc (ev) {
    	ev.preventDefault();
    }
})();

//判断某个元素是否出现在可视区域的代码
/**
* [isVisible 用来判断某个元素是否出现在可视区域内,暂时需要依赖jquery]
* @param  {[type]}  node [传入需要判断的元素]
* @return {Boolean}      [返回一个boolean值,若为true则出现在可视区域]
*/
// export function isVisible (node) {
//   let winH = $(window).height(),
//   scrollTop = $(window).scrollTop(),
//   offSetTop = $(node).offset().top;
//   if (offSetTop < winH + scrollTop) {
//     return true;
//   } else {
//     return false;
//   }
// }

/**
* [queryStr 获取地址栏查询字符串的键值,并存放在对象中]
* @param  {[type]} url [description]
* @return {[type]}     [description]
*/
export function queryStr (url) {
  let tempObj = {};
  let arr = url.substr(url.indexOf('?') + 1).split('&');
  for (let i = 0; i < arr.length; i++) {
    let tempArr = arr[i].split('=');
    tempObj[tempArr[0]] = tempArr[1];
  }
  return tempObj;
};

//    得到任意样式的值 element.currentStyle[atrr]兼容IE8,window.getComputedStyle(element,null)[atrr]兼容火狐 该方法目前元素必须设置初始值,没有初始值返回auto,是字符串的形式.
export function getStyle (element, attr) {
  return element.currentStyle ? element.currentStyle[attr] : window.getComputedStyle(element, null)[attr] || 0;
};

//    获取上,左滚动出去的距离,以 对象 的形式返回
export function getScroll () {
  return {
    left: window.pageXOffset || document.body.scrollLeft || document.documentElement.scrollLeft || 0,
    top: window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop || 0,
  };
};

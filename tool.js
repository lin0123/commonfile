/**
* [getUrlHashQuery get url hash query]
* @param  {[]} [description]
* @return {[type]} Object [description]
*/
let getUrlHashQuery = function () {
  let str = window.decodeURIComponent(window.location.href);
  let resultObj = {}, tempArr;
  if (str.indexOf('?', str.indexOf('#')) <= -1) return resultObj;
  str.substr(str.indexOf('?', str.indexOf('#')) + 1).split('&').forEach(ele => {
    tempArr = ele.split('=');
    resultObj[tempArr[0]] = tempArr[1];
  });
  return resultObj;
};

/**
* [getUrlQuery get url query]
* @param  {[]} [description]
* @return {[type]} Object [description]
*/
let getUrlQuery = function () {
  let str = window.location.search.substr(1);
  let obj = {}, tempArr;
  if (!str) return obj;
  str.split('&').foreach(item => {
    tempArr = item.split('=');
    obj[tempArr[0]] = tempArr[1];
  });
  return obj;
};

/**
* [roundNum get point precision num]
* @param  {[num, precision]} [description]
* @return {[type]} number [description]
*/
let roundNum = function (num, precision) {
  return Math.round(num * Math.pow(10, precision || 2)) / Math.pow(10, precision || 2);
};

let mathOpera = {
};

export default {
  getUrlHashQuery,
  getUrlQuery,
  roundNum,
  mathOpera,
};

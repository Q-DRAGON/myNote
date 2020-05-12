import httb from './axios';
import FileSaver from 'file-saver';

export function postDownloadExcel(url, data) {
  let name = url.slice(url.lastIndexOf('/') + 1);
  let options = {
    'headers': {
      'Content-type': 'application/json; charset=utf-8'
    },
    'responseType': 'blob',
  };
  httb.postl(url, data, options).then((res) => {
    if (res) {
      FileSaver.saveAs(res, `${name}.xlsx`);
    }
  });
}

export function parseDate(date, cFormat) {
  let format = cFormat || 'y-m-d h:i:s';
  let formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  };
  const time_str = format.replace(/([ymdhisa])+/g, (result, key) => {
    let value = formatObj[key];
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    return value.toString().padStart(2, '0');
  });
  return time_str;
}


export function createAction(method, api, mtype) {
  return async function action({commit}, {data = {}, config = {}}) {
    const res = await httb[method](api, data, config);
    if (mtype && res && res.data) {
      commit(mtype, res.data);
    }
    return res;
  }
}

export function getQueryObject(url) {
  url = url == null ? window.location.href : url;
  const search = url.substring(url.lastIndexOf('?') + 1);
  const obj = {};
  const reg = /([^?&=]+)=([^?&=]*)/g;
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1)
    let val = decodeURIComponent($2)
    val = String(val)
    obj[name] = val
    return rs
  });
  return obj;
}


export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'deepClone');
  }
  const targetObj = source.constructor === Array ? [] : {};
  object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys]);
    } else {
      targetObj[keys] = source[keys];
    }
  });
  return targetObj;
}

// 函数防抖，规定时间内执行， 在事件被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时。 debounce.
// 函数节流，定义的时间类函数只会执行一次
export function debounce(fn, wait) {
  var timer = null;
  return function () {
      var context = this
      var args = arguments
      if (timer) {
          clearTimeout(timer);
          timer = null;
      }
      timer = setTimeout(function () {
          fn.apply(context, args)
      }, wait)
  }
}

export function throttle(fn, gapTime) {
  let _lastTime = null;

  return function () {
    let _nowTime = + new Date()
    if (_nowTime - _lastTime > gapTime || !_lastTime) {
      fn();
      _lastTime = _nowTime
    }
  }
}


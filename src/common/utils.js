export function debounce(func,delay){
    var timer;
    return function(...args){
        let _this=this;
        if(timer) clearTimeout(timer);
        timer=setTimeout(()=>{
            func.apply(_this,args);
        },delay);
    }
}

export function throttle(func,delay){
    var timer;
    return function(...args){
        let _this=this;
        if(timer) return;
        timer=setTimeout(()=>{
            func.apply(_this,args);
            timer=null;
        },delay);
    }
}

function padLeftZero (str) {
    return ('00' + str).substr(str.length);
}

export function formatDate(date, fmt) {
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds()
    };
    for (let k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
        let str = o[k] + '';
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
      }
    }
    return fmt;
}


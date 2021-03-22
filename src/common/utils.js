export function debounce(func,delay){
    var timer;
    return function(){
        let _this=this;
        let args=arguments;
        if(timer) clearTimeout(timer);
        timer=setTimeout(()=>{
            func.apply(_this,args);
        },delay);
    }
}

export function throttle(func,delay){
    var timer;
    return function(){
        let _this=this;
        let args=arguments;
        if(timer) return;
        timer=setTimeout(()=>{
            func.apply(_this,args);
            timer=null;
        },delay);
    }
}
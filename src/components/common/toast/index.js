import Toast from "./toast"

const obj={};
obj.install=function(Vue){
    //创建组件构造器
    const toastConstructor=Vue.extend(Toast);
    //创建一个组件对象
    const toast=new toastConstructor();
    //手动挂载到元素上
    toast.$mount(document.createElement("div"));
    //将toast添加到body上
    document.body.appendChild(toast.$el);
    //将Toast组件赋值到vue的原型属性
    Vue.prototype.$toast=toast;
}

export default obj;
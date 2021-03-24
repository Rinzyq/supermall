import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cartList:[]
  },
  mutations: {
    addItemCart(state,product){
      //判断数组中是否有同样的商品
      //箭头函数部分不能加大括号，会被引擎解析为代码块
      let oldProduct=state.cartList.find(item=>(item.iid===product.iid));
      if(oldProduct){
        oldProduct.count+=1;//引入相同的内存地址
      }else{
        product.count=1;
        state.cartList.push(product);
      }
    }
  },
  actions: {
  },
  modules: {
  }
})

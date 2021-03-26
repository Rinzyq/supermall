export default {
    addItemCart(context,product){
        return new Promise((resolve,reject)=>{
          //判断数组中是否有同样的商品
          //箭头函数部分不能加大括号，会被引擎解析为返回一个对象
          let oldProduct=context.state.cartList.find(item=>(item.iid===product.iid));
          if(oldProduct){
            context.commit("addCount",oldProduct);
            resolve("商品数量+1")
          }else{
            product.count=1;
            context.commit("addToCart",product);
            resolve("商品添加到购物车")
          }
        })
    }
}
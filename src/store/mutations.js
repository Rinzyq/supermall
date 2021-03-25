export default {
    addToCart(state,product){
        state.cartList.push(product);
    },
    addCount(state,oldProduct){
        oldProduct.count+=1;//引入相同的内存地址
    }
}
export default {
    addToCart(state,product){
        product.checked=true;
        state.cartList.push(product);
    },
    addCount(state,oldProduct){
        oldProduct.count+=1;//引入相同的内存地址
    },
    isChecked(state,product){
        product.checked=!product.checked;
    },
    falseCheck(state){
        state.cartList.forEach(item => {
            item.checked=false;
        });
    },
    trueCheck(state){
        state.cartList.forEach(item=>{
            item.checked=true;
        });
    }
}
<template>
    <div class="bottom-bar">
        <div class="check-content" @click="totalClick">
            <check-button class="check-button" 
                :isChecked="isSelectAll"></check-button>
            <span>全选</span>
        </div>
        <div class="total">合计：￥{{totalPrice}}</div>
        <div class="calculate">结算:({{totalCount}})</div>
    </div>
</template>

<script>
import CheckButton from "content/checkButton/checkButton"

export default {
    name:"CartbuttonBar",
    components:{
        CheckButton
    },
    computed:{
        totalPrice(){
            return this.$store.state.cartList.filter(item=>{
                return item.checked;
            }).reduce((preValue,item)=>{
                return preValue+item.price*item.count
            },0).toFixed(2);//第二个参数设置为0，表示第一个参数的默认值为0
        },
        totalCount(){
            return this.$store.state.cartList.filter(item=>item.checked).length;
        }, 
        isSelectAll(){
            if(!this.totalCount) return false;
            return !(this.$store.state.cartList.find(item=>!item.checked));
        }
    },
    methods:{
        totalClick(){
            if(this.isSelectAll){
                this.$store.commit("falseCheck");
            }else{
                this.$store.commit("trueCheck");
            }
        }
    }
}
</script>

<style scoped>
.bottom-bar{
    height: 40px;
    position: absolute;
    bottom: 49px;
    width: 100%;
    line-height: 40px;
    background-color: #eee;
    display: flex;
    font-size: 13px;
}
.check-content{
    display: flex;
    align-items: center;
    margin-left: 10px;
    width: 60px;
    font-size: 16px;
}
.check-button{
    line-height: 20px;
    margin-right: 6px;
}
.total{
    margin-left: 25px;
    flex: 1;
}
.calculate{
    width: 90px;
    color: #fff;
    background-color: var(--color-tint);
    text-align: center;
}
</style>
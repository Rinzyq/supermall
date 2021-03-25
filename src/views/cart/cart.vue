<template>
    <div id="cart">
        <nav-bar class="nav-var"><template v-slot:center>购物车({{cartLength}})</template></nav-bar>
        <scroll class="wrapper" :pullUpload="true" ref="scroll"  :probeType="3">
            <cart-list></cart-list>
        </scroll>
        <cart-bottom-bar></cart-bottom-bar>
    </div>
</template>

<script>
import NavBar from "common/navbar/navbar"
import CartList from "./childComp/cartList"
import CartBottomBar from "./childComp/cartBottomBar"

//引入mapGetters辅助函数
import {mapGetters} from "vuex"
//引入滚动插件
import Scroll from "common/scroll/scroll"

export default {
    name:"Cart",
    components:{
        NavBar,
        CartList,
        CartBottomBar,
        Scroll
    },
    computed:{
        ...mapGetters(["cartLength"])
    },
    activated(){
        this.$refs.scroll.refresh();
    }
}
</script>

<style scoped>
.nav-bar{
    background-color: var(--color-tint);
    color: #fff;
}
#cart{
    height: 100vh;
    position: relative;
}
.wrapper{
    width: 100%;
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 89px;
}
</style>
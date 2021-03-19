<template>
    <tab-bar>
        <tab-bar-item path="/home" activeColor="deeppink">
            <template v-slot:item-icon><img src="~assets/img/tabbar/home.svg" alt=""></template>
            <template v-slot:item-icon-active><img src="~assets/img/tabbar/home_active.svg" alt=""></template>
            <template v-slot:item-text><div>首页</div></template>  
        </tab-bar-item>
        <tab-bar-item path="/category" activeColor="deeppink">
            <template v-slot:item-icon><img src="~assets/img/tabbar/home.svg" alt=""></template>
            <template v-slot:item-icon-active><img src="~assets/img/tabbar/home_active.svg" alt=""></template>
            <template v-slot:item-text><div>分类</div></template>  
        </tab-bar-item>
        <tab-bar-item path="/cart" activeColor="deeppink">
            <template v-slot:item-icon><img src="~assets/img/tabbar/home.svg" alt=""></template>
            <template v-slot:item-icon-active><img src="~assets/img/tabbar/home_active.svg" alt=""></template>
            <template v-slot:item-text><div>购物车</div></template>  
        </tab-bar-item>
        <tab-bar-item path="/profile" activeColor="deeppink">
            <template v-slot:item-icon><img src="~assets/img/tabbar/home.svg" alt=""></template>
            <template v-slot:item-icon-active><img src="~assets/img/tabbar/home_active.svg" alt=""></template>
            <template v-slot:item-text><div>我的</div></template>  
        </tab-bar-item>
    </tab-bar>
</template>

<script>
import tabBar from "components/common/tabbar/tabbar"
import tabBarItem from "components/common/tabbar/tabBarItem"

export default {
    name:"mainTabBar",
    components:{
        tabBar,
        tabBarItem
    }
}
</script>

<style scoped>

</style>
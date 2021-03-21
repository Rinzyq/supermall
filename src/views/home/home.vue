<template>
    <div id="home">
        <nav-bar class="home-nav"><template v-slot:center>购物街</template></nav-bar>
        <home-swiper :banners="banners"></home-swiper>
        <recommend-view :recommends="recommends"></recommend-view>
    </div>
</template>

<script>
import NavBar from "components/common/navbar/navbar"
import HomeSwiper from "./childComp/homeswiper"
import RecommendView from "./childComp/recommendview"
import {getHomeMultidata} from "network/home"

export default {
    name:"Home",
    components:{
        NavBar,
        HomeSwiper,
        RecommendView
    },
    data(){
        return {
            banners:[],
            recommends:[]
        }
    },
    created(){
        //在created生命周期请求多个数据
        getHomeMultidata().then(res=>{
            this.banners=res.data.banner.list;
            this.recommends=res.data.recommend.list;
            console.log(this.recommends);
        })
    },
}
</script>

<style scoped>
    .home-nav{
        background-color: var(--color-tint);
        color: #fff;
    }
</style>
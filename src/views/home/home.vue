<template>
    <div id="home">
        <nav-bar class="home-nav"><template v-slot:center>购物街</template></nav-bar>
        <!-- <home-swiper :banners="banners"></home-swiper> -->
    </div>
</template>

<script>
import NavBar from "components/common/navbar/navbar"
import HomeSwiper from "./childComp/homeswiper"
import {getHomeMultidata} from "network/home"

export default {
    name:"Home",
    components:{
        NavBar,
        /* HomeSwiper */
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
            _this.banners=res.data.banner.list;
            _this.recommends=res.data.banner.list;
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
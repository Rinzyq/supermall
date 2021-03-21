<template>
    <div id="home">
        <nav-bar class="home-nav"><template v-slot:center>购物街</template></nav-bar>
        <scroll class="wrapper" ref="scroll" :probeType="3" @scroll="contentScroll">
            <home-swiper :banners="banners"></home-swiper>
            <recommend-view :recommends="recommends"></recommend-view>
            <feature-view></feature-view>
            <tab-control @tabClick="tabClick" 
                class="tab-control" 
                :titles="['流行','新款','精选']">
            </tab-control>
            <goods-list :goods="showGoods"></goods-list>
        </scroll>
        <back-top @click="backClick" v-show="isShow"/>
    </div>
</template>

<script>
import NavBar from "common/navbar/navbar"
import HomeSwiper from "./childComp/homeswiper"
import RecommendView from "./childComp/recommendview"
import FeatureView from "./childComp/featureview"
import TabControl from "content/tabControl/tabcontrol"
import GoodsList from "content/goods/goodsList"


//引入滚动组件
import Scroll from "common/scroll/scroll"
//引入BackTop组件
import BackTop from "content/backTop/backtop"
//引入网络相关方法
import {getHomeMultidataAxios,getHomeGoodsAxios} from "network/home"

export default {
    name:"Home",
    components:{
        NavBar,
        HomeSwiper,
        RecommendView,
        FeatureView,
        TabControl,
        GoodsList,
        Scroll,
        BackTop
    },
    data(){
        return {
            banners:[],
            recommends:[],
            goods:{
                "pop":{page:0,list:[]},
                "new":{page:0,list:[]},
                "sell":{page:0,list:[]}
            },
            currentType:"pop",
            isShow:false
        }
    },
    computed:{
        showGoods(){
            return this.goods[this.currentType].list
        }
    },
    methods:{
        tabClick(index){
            switch(index){
                case 0:
                    this.currentType="pop";
                    break;
                case 1:
                    this.currentType="new";
                    break;
                case 2:
                    this.currentType="sell";
            }
        },
        backClick(){
            this.$refs.scroll.scrollTo(0,0);
        },
        contentScroll(position){
            this.isShow=position.y<-500;
        },
        //网络请求相关方法
        getHomeMultidata(){
            getHomeMultidataAxios().then(res=>{
                this.banners=res.data.banner.list;
                this.recommends=res.data.recommend.list;
            }).catch(err=>{
                console.log(err);
            })
        },
        getHomeGoods(type){
            //每次请求数据刷新page
            let page=this.goods[type].page+1
            getHomeGoodsAxios(type,page).then(res=>{
                //将返回的数据push到list
                this.goods[type].list.push(...res.data.list);
                this.goods[type].page+=1;
            }).catch(err=>{
                console.log(err);
            })
        }
    },
    created(){
        //在created生命周期请求多个数据
        this.getHomeMultidata();
        //请求商品数据
        this.getHomeGoods("pop");
        this.getHomeGoods("new");
        this.getHomeGoods("sell");
    },
}
</script>

<style scoped>
    .home-nav{
        background-color: var(--color-tint);
        color: #fff;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 10;
    }
    #home{
        padding-top: 44px;
        height: 100vh;
        position: relative;
    }
    .tab-control{
        /* position: sticky; */
        top: 44px;
        background-color: #fff;
        /* z-index: 10; */
    }
    .wrapper{   /* 如果用最新版本的better-scroll会导致没办法滑动 */
        overflow: hidden;
        position: absolute;
        top: 44px;
        bottom: 49px;

    }
</style>
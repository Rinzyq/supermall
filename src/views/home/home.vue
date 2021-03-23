<template>
    <div id="home">
        <nav-bar class="home-nav"><template v-slot:center>购物街</template></nav-bar>
        <tab-control class="tab-control"
                @tabClick="tabClick" 
                :titles="['流行','新款','精选']"
                ref="tabControl1" v-show="isTabShow">
        </tab-control>
        <scroll class="wrapper" ref="scroll" 
                :probeType="3" 
                @scroll="contentScroll"
                :pullUpload="true"
                @pullingUp="loadMore">
            <home-swiper :banners="banners" @swiperImgLoad="swiperImgLoad"></home-swiper>
            <recommend-view :recommends="recommends"></recommend-view>
            <feature-view></feature-view>
            <tab-control class="tab-control"
                @tabClick="tabClick" 
                :titles="['流行','新款','精选']"
                ref="tabControl2">
            </tab-control>
            <goods-list :goods="showGoods"></goods-list>
        </scroll>
        <back-top @click="backClick" v-show="isShow"/>
    </div>
</template>

<script>
import NavBar from "common/navbar/navbar"
import TabControl from "content/tabControl/tabcontrol"
import HomeSwiper from "./childComp/homeswiper"
import RecommendView from "./childComp/recommendview"
import FeatureView from "./childComp/featureview"
import GoodsList from "content/goods/goodsList"


//引入滚动组件
import Scroll from "common/scroll/scroll"
//引入BackTop组件
import BackTop from "content/backTop/backtop"
//引入防抖函数
/* import {debounce} from "@/common/utils" */
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
            isShow:false,
            tabOffsetTop:0,
            isTabShow:false,
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
            this.$refs.tabControl1.currentIndex=index;
            this.$refs.tabControl2.currentIndex=index;
        },
        backClick(){
            this.$refs.scroll.scrollTo(0,0);
        },
        contentScroll(position){
            //判断backTop是否显示
            this.isShow=position.y<-500;
            //判断tabControl是否吸顶
            this.isTabShow=(-position.y)>this.tabOffsetTop;
        },
        loadMore(){
            this.getHomeGoods(this.currentType);
        },
        swiperImgLoad(){
            this.tabOffsetTop=this.$refs.tabControl2.$el.offsetTop;
        },
        //网络请求相关方法
        getHomeMultidata(){
            getHomeMultidataAxios().then(res=>{
                this.banners=res.data.banner.list;
                this.recommends=res.data.recommend.list;
            }).catch(err=>{
                console.log(err);
            });
        },
        getHomeGoods(type){
            //每次请求数据刷新page
            let page=this.goods[type].page+1
            getHomeGoodsAxios(type,page).then(res=>{
                //将返回的数据push到list
                this.goods[type].list.push(...res.data.list);
                this.goods[type].page+=1;
                //刷新可滚动区域高度
                this.$refs.scroll.refresh();
                //完成上拉操作
                this.$nextTick(()=>{
                //在下方created周期也使用了这个方法，所以找不到scroll，需要在nextTick函数里调用
                this.$refs.scroll.finishPullUp();
            });
            }).catch(err=>{
                console.log(err);
            });
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
    }
    #home{
        height: 100vh;
        position: relative;
    }
    .tab-control{
        position: relative;
        z-index: 10;
        background-color: #fff;
    }
    .wrapper{  
        overflow: hidden;
        position: absolute;
        top: 44px;
        bottom: 49px;

    }
</style>
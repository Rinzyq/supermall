<template>
    <div id="detail">
        <detail-nav-bar @titleClick="titleClick"></detail-nav-bar>
        <!--scroll的类名只能用wrapper不然会无法滚动-->
        <scroll class="wrapper" ref="scroll" :probeType="3"
            :pullUpload="true" @scroll="detailScroll">
            <detail-swiper :swiperImg="swiperImg"></detail-swiper>
            <detail-base-info :goods="goodsInfo"></detail-base-info>
            <detail-shop-info :shop="shop"></detail-shop-info>
            <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
            <detail-param-info ref="param" :detailParams="detailParams"></detail-param-info>
            <detail-comment-info ref="comment" :commentInfo="commentInfo"></detail-comment-info>
            <goods-list ref="recommend" :goods="recommends"></goods-list>
        </scroll>
    </div>
</template>

<script>
import DetailNavBar from "./childComp/detailNavbar"
import DetailSwiper from "./childComp/detailswiper"
import DetailBaseInfo from "./childComp/detailBaseInfo"
import DetailShopInfo from "./childComp/detailShopInfo"
import DetailGoodsInfo from "./childComp/detailGoodsInfo"
import DetailParamInfo from "./childComp/detailParamInfo"
import DetailCommentInfo from "./childComp/detailCommentInfo"
import GoodsList from "content/goods/goodsList"

//引入滚动组件
import Scroll from "common/scroll/scroll"

//获取网络请求
import {getDetail,getDetailRecommend,GoodsInfo,Shop,GoodsParam} from "network/detail"

export default {
    name:"Detail",
    components:{
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        DetailGoodsInfo,
        DetailParamInfo,
        DetailCommentInfo,
        GoodsList,
        Scroll
    },
    data(){
        return {
            iid:null,
            swiperImg:[],
            goodsInfo:{},
            shop:{},
            detailInfo:{},
            detailParams:{},
            commentInfo:{},
            recommends:[],
            themeTopYs:[]
        }
    },
    methods:{
        imageLoad(){
            //刷新可滚动区域
            this.$refs.scroll.refresh();
        },
        titleClick(index){
            this.$refs.scroll.scrollTo(0,-this.themeTopYs[index]);
        },
        detailScroll(position){
            let positionY=-position.y
            console.log(position);
        }
            /* //获取各组件offsetTop
            this.themeTopYs.push(0);
            this.themeTopYs.push(this.$refs.param.$el.offsetTop);
            this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
            this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
            console.log(this.themeTopYs); */
    },
    created(){
        this.iid=this.$route.params.id;
        getDetail(this.iid).then(res=>{
            //获取轮播图数据
            this.swiperImg=res.result.itemInfo.topImages;
            //获取商品信息
            const data=res.result;
            this.goodsInfo=new GoodsInfo(data.columns,data.itemInfo,data.shopInfo.services);
            //获取店铺信息
            this.shop=new Shop(data.shopInfo);
            //获取商品详细信息
            this.detailInfo=data.detailInfo;
            //获取商品尺码参数信息
            this.detailParams=new GoodsParam(data.itemParams.info,data.itemParams.rule);
            //获取用户评论信息
            if(data.rate.cRate!==0){
                this.commentInfo=data.rate.list[0];
            }
        }).catch(err=>{
            console.log(err);
        });
        getDetailRecommend().then(res=>{
            this.recommends=res.data.list;
            //刷新可滚动区域高度
            this.$refs.scroll.refresh();
        })
    },
}
</script>

<style scoped>
#detail{
    position: relative;
    z-index: 10;
    background-color: #fff;
    height: 100vh;
}
.wrapper{
    position: absolute;
    top: 44px;
    bottom: 0px;
    width: 100%;
    overflow: hidden;
}
</style>
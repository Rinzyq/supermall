<template>
    <div id="detail">
        <detail-nav-bar></detail-nav-bar>
        <!--scroll的类名只能用wrapper不然会无法滚动-->
        <scroll class="wrapper" ref="scroll"
            :pullUpload="true">
            <detail-swiper :swiperImg="swiperImg"></detail-swiper>
            <detail-base-info :goods="goodsInfo"></detail-base-info>
            <detail-shop-info :shop="shop"></detail-shop-info>
            <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
            <detail-param-info :detailParams="detailParams"></detail-param-info>
            <detail-comment-info :commentInfo="commentInfo"></detail-comment-info>
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

//引入滚动组件
import Scroll from "common/scroll/scroll"

//获取网络请求
import {getDetail,GoodsInfo,Shop,GoodsParam} from "network/detail"

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
            commentInfo:{}
        }
    },
    methods:{
        imageLoad(){
            //刷新可滚动区域
            this.$refs.scroll.refresh();
        }
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
            this.commentInfo=data.rate.list[0];
            console.log(data.rate.list[0]);
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
<template>
    <div id="detail">
        <detail-nav-bar @titleClick="titleClick" ref="nav"></detail-nav-bar>
        <!--scroll的类名只能用wrapper不然会无法滚动-->
        <div>{{$store.cartList}}</div>
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
        <back-top @click.native="backClick" v-show="isShow"/>
        <detail-bottom-bar @addCart="addCart"></detail-bottom-bar>
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
import DetailBottomBar from "./childComp/detailBottomBar"

//引入滚动组件
import Scroll from "common/scroll/scroll"
//引入混入的backTop组件
import {backTopMixin} from "@/common/mixin"

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
        DetailBottomBar,
        Scroll
    },
    mixins:[backTopMixin],
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
            themeTopYs:[],
            currentIndex:0
        }
    },
    methods:{
        imageLoad(){
            //获取各组件offsetTop
            this.themeTopYs.push(0);
            this.themeTopYs.push(this.$refs.param.$el.offsetTop);
            this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
            this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
            //push一个最大值进入数组方便detailScroll函数的判断
            this.themeTopYs.push(Number.MAX_VALUE);
            //刷新可滚动区域
            this.$refs.scroll.refresh();
        },
        titleClick(index){
            this.$refs.scroll.scrollTo(0,-this.themeTopYs[index]);
        },
        detailScroll(position){
            //判断顶部导航栏的位置
            let positionY=-position.y;
            let length=this.themeTopYs.length;
            for(let i=0;i<length-1;i++){
                if(this.currentIndex!==i&&
                    (positionY>=this.themeTopYs[i]&&positionY<this.themeTopYs[i+1])){
                    this.currentIndex=i;
                    this.$refs.nav.currentIndex=i;
                }
            }
            //判断backTop是否显示
            this.isShow=position.y<-1000;
        },
        addCart(){
            //获取购物车展示的信息
            const product={};
            product.img=this.swiperImg[0];
            product.title=this.goodsInfo.title;
            product.desc=this.goodsInfo.desc;
            product.price=this.goodsInfo.price;
            product.iid=this.iid;
            //添加至store
            this.$store.commit("addItemCart",product);
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
    bottom: 58px;
    width: 100%;
    overflow: hidden;
}
</style>
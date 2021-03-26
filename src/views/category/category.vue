<template>
    <div id="category">
        <nav-bar nav-bar><template v-slot:center>商品分类</template></nav-bar>
        <div class="category-content">
            <tab-menu :categories="categories" @selectItem="selectItem"></tab-menu>
            <scroll :pullUpload="true" class="wrapper" ref="scroll">
                <tab-content-category :subcategories="showSubcategory"></tab-content-category>
            </scroll>
        </div>
    </div>
</template>

<script>
import NavBar from "common/navbar/navbar"
import TabMenu from "./childComp/tabMenu"
import TabContentCategory from "./childComp/tabContentCategory"

import Scroll from "common/scroll/scroll"

import {getCategory,getSubcategory,getCategoryDetail} from "network/category"

export default {
    name:"Category",
    components:{
        NavBar,
        TabMenu,
        TabContentCategory,
        Scroll
    },
    data(){
        return {
            categories:[],
            categoryData:[],
            currentIndex:-1
        }
    },
    computed:{
        showSubcategory() {
		    if (this.currentIndex === -1) return {}
            return this.categoryData[this.currentIndex].subcategories
        },
    },
    created(){
        getCategory().then(res=>{
            //获取分类数据
            this.categories=res.data.category.list;
            //初始化分类
            for(let i=0;i<this.categories.length;i++){
                this.categoryData[i]={
                    subcategories:{},
                    categoryDetail:{
                        "pop":[],
                        "new":[],
                        "sell":[]
                    }
                }
            }
            //默认请求第一个分类的数据
            this._getSubcategories(0);
        }).catch(err=>{
            console.log(err);
        });
    },
    mounted(){
        setTimeout(()=>{
            this.$refs.scroll.scrollData.refresh();
        },500);
    },
    methods:{
        //封装网络请求方法
        _getSubcategories(index){
            this.currentIndex=index;
            const maitKey=this.categories[index].maitKey;
            //发送请求
            getSubcategory(maitKey).then(res=>{
                this.categoryData[index].subcategories=res.data;
                //请求三种子分类数据
                this._getCategoryDetail("pop");
                this._getCategoryDetail("new");
                this._getCategoryDetail("sell");
            }).catch(err=>{
                console.log(err);
            });
        },
        _getCategoryDetail(type){
            //获取miniWallkey
            const miniWallkey=this.categories[this.currentIndex].miniWallkey;
            //发送请求
            getCategoryDetail(miniWallkey,type).then(res=>{
                this.categoryData[this.currentIndex].categoryDetail[type]=res;
                this.categoryData={...this.categoryData};//转换成对象
            }).catch(err=>{
                console.log(err);
            });
        },
        //点击tabMenu方法
        selectItem(index){
            this._getSubcategories(index);
            setTimeout(()=>{
            this.$refs.scroll.scrollData.refresh();
            },500);
        }
    }
}
</script>

<style scoped>
#category{
    height: 100vh;
    position: relative;
}
.nav-bar{
    background-color: var(--color-tint);
    color: #fff;
    position: fixed;
    z-index: 10;
}
.category-content{
    display: flex;
    width: 100%;
    height: 100vh;
    position: relative;
}
.wrapper{
    position: absolute;
    right: 0;
    left: 100px;
    top: 44px;
    bottom: 49px;
    width: calc(100% - 100px - 0);
    overflow: hidden;
    box-sizing: border-box;
}
</style>
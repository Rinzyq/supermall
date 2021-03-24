<template>
    <div ref="wrapper">
        <div>
            <slot></slot>
        </div>
    </div>
</template>

<script>
import BScroll from "better-scroll"

export default {
    name:"Scroll",
    data(){
        return {
            scrollData:null
        }
    },
    props:{
        probeType:{
            type:Number,
            default(){
                return 0;
            }
        },
        pullUpload:{
            type:Boolean,
            default(){
                return false;
            }
        }
    },
    mounted(){   //需要在挂在模板后初始化BScroll，不然找不到模板
        //创建BScroll对象
        this.scrollData=new BScroll(this.$refs.wrapper,{
            probeType:this.probeType,
            click:true,
            pullUpLoad:this.pullUpload
        });
        //监听滚动位置
        this.scrollData.on("scroll",(position)=>{
            this.$emit("scroll",position);
        });
        //监听上拉事件
        this.scrollData.on("pullingUp",()=>{
            this.$emit("pullingUp")
        });
    },
    methods:{
        scrollTo(x,y,time=300){
            this.scrollData.scrollTo(x,y,time);
        },
        finishPullUp(){
            this.scrollData.finishPullUp();
        },
        refresh(){
            this.scrollData.refresh();
        }
    }
}
</script>
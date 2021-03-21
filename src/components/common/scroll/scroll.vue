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
        }
    },
    mounted(){   //需要在挂在模板后初始化BScroll，不然找不到模板
        this.scrollData=new BScroll(this.$refs.wrapper,{
            probeType:this.probeType,
            click:true,
            /* pullUpLoad:true */
        });
        this.scrollData.on("scroll",(position)=>{
            this.$emit("scroll",position);
        })
    },
    methods:{
        scrollTo(x,y,time=500){
            this.scrollData.scrollTo(x,y,time);
        }
    }
}
</script>
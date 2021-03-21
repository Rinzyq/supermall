<template>
    <div class="swiper-container">
        <swiper :options="swiperOptions">
            <swiper-slide class="swiper-slide" v-for="(item,index) in banners" :key="index">
                <a href=""></a>
            </swiper-slide>
            <template v-slot:pagination>
                <div class="swiper-pagination"></div>
            </template>
        </swiper>
    </div>
</template>

<script>
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'

export default {
    name:"HomeSwiper" ,
    components:{
        Swiper,
        SwiperSlide
    },
    directives:{
        swiper:directive
    },
    data(){
        return {
            swiperOptions:{}
        }
    },
    props:{
        banners:{
            type:Array,
            dafault(){
                return []
            }
        }
    }
}
</script>

<style scoped>
/*     .swiper-container{
        
    }
    .swiper-slide{
        
    }
    .swiper-slide:nth-child(2){
        
    } */
</style>
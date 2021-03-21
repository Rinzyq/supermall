<template>
    <div class="home-swiper">
        <swiper v-if="banners.length>0">
            <slide v-for="(item,index) in banners" :key="index" class="slide">
                <a :href="item.link">
                    <img :src="item.image" alt="">
                </a>
            </slide>
        </swiper>
    </div>
</template>

<script>
import {Swiper,Slide} from "vue-swiper-component";

export default {
    name:"HomeSwiper",
    components:{
        Swiper,
        Slide
    },
    props:{
        banners:{
            type:Array,
            default(){
                return []
            }
        }
    },
}
</script>

<style scoped>
.home-swiper{
    width: 100%;
    overflow: hidden;
}
.slide img{
    width: 100%;
}
</style>
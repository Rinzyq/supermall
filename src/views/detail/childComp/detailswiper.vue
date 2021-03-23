<template>
    <div class="detail-swiper">
        <swiper v-if="swiperImg.length>0">
            <slide class="swiper-item" v-for="(item,index) in swiperImg" :key="index">
                    <img :src="item" alt="">
            </slide>
        </swiper>
    </div>
</template>

<script>
import {Swiper,Slide} from "vue-swiper-component";

export default {
    name:"DetailSwiper",
    components:{
        Swiper,
        Slide
    },
    props:{
        swiperImg:{
            type:Array,
            default(){
                return []
            }
        }
    },
}
</script>

<style scoped>
.swiper-item{
    height: 300px;
}
.swiper-item img{
    width: 350px;
    position: relative;
    top: -50px;
}
</style>
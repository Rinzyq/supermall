<template>
    <div>
        <nav-bar>
            <template #center>
                <span v-for="(item,index) in titles" :key="index">{{item}}</span>
            </template>
        </nav-bar>
        
    </div>
</template>

<script>
import NavBar from "common/navbar/navbar"
export default {
    name:"DetailNavBar",
    components:{
        NavBar
    },
    data(){
        return {
            titles:["商品","参数","评论","推荐"]
        }
    }
}
</script>
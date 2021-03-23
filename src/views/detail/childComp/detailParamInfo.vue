<template>
    <div class="param-info" v-if="Object.keys(detailParams).length!==0">
        <table v-for="(table,index) in detailParams.sizes" :key="index" class="info-size">
            <tr v-for="(tr,index1) in table" :key="index1">
                <td v-for="(td,index2) in tr" :key="index2">{{td}}</td>
            </tr>
        </table>
        <table class="info-param">
            <tr v-for="(item,index3) in detailParams.infos" :key="index3">
                <td class="info-param-key">{{item.key}}</td>
                <td class="param-value">{{item.value}}</td>
            </tr>
        </table>
        <div class="info-img" v-if="detailParams.img.length!==0">
            <img :src="detailParams.img" alt="">
        </div>
    </div>
</template>

<script>
export default {
    name:"DetailParamInfo",
    props:{
        detailParams:{
            type:Object,
            default(){
                return {}
            }
        }
    }
}
</script>

<style scoped>
.param-info{
    padding: 20px 15px;
    font-size: 14px;
    border-bottom: 5px solid #f2f5f8;
}
.param-info table{
    width: 100%;
    border-collapse: collapse;
}
.param-info table tr{
    height: 42px;
}
.param-info table tr td{
    border-bottom: 1px solid rgba(100, 100, 100, 0.2);
}
.info-param-key{
    width: 95px;
}
.info-param{
    border-top: 1px solid rgba(0, 0, 0, 0.2);
}
.param-value{
    color: #eb4868;
}
.info-img img{
    width: 100%;
}
</style>
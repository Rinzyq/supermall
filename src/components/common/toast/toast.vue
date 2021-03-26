<template>
  <div class="toast" v-show="isShow">
      <span>{{message}}</span>
  </div>
</template>

<script>
export default {
    name:"Toast",
    data(){
        return {
            message:"",
            isShow:false
        }
    },
    methods:{
        show(message,duration=1000){
            this.isShow=true;
            this.message=message;
            setTimeout(()=>{
                this.isShow=false;
                this.message='';
            },duration);
        }
    }
}
</script>

<style scoped>
.toast{
    color: #fff;
    background-color: rgba(0,0,0,0.75);
    padding: 8px 10px;
    position: fixed;
    z-index: 999;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    border-radius: 10px;
}
</style>
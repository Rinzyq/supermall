<template>
  <div class="check-button" :class="{active:isChecked}">
      <img src="~assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
export default {
    name:"CheckButton",
    props:{
        isChecked:{
            type:Boolean,
            default(){
                return false
            }
        }
    }
}
</script>

<style scoped>
.check-button{
    border-radius: 50%;
    border: 2px solid #aaa;
    height: 20px;
}
.active{
    background-color: var(--color-tint);
}
</style>
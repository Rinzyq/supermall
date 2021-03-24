<template>
  <div class="bottom-bar">
      <div class="bar-item bar-left">
          <div>
              <i class="icon service"></i>
              <span class="text">客服</span>
          </div>
          <div>
              <i class="icon shop"></i>
              <span class="text">店铺</span>
          </div>
          <div>
              <i class="icon select"></i>
              <span class="text">收藏</span>
          </div>
      </div>
      <div class="bar-item bar-right">
          <div class="cart" @click="addToCart">加入购物车</div>
          <div class="buy">购买</div>
      </div>
  </div>
</template>

<script>
export default {
    name:"DetailBottomBar",

}
</script>

<style scoped>
.bottom-bar{
    height: 58px;
    background-color: #fff;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    text-align: center;
}
.bar-item{
    flex: 1;
    display: flex;
}
.bar-item div{
    flex: 1;
}
.bar-left .text{
    font-size: 13px;
}
.bar-left .icon{
    background-image: url("~assets/img/detail/detail_bottom.png");
    background-size: 100%;
    width: 23px;
    height: 23px;
    display: block;
    margin: 10px auto 3px;
}
.service{
    background-position: 0 -54px;
}
.shop{
    background-position: 0 -101px;
}
.select{
    background-position: 0 2px;
}
.bar-right{
    font-size: 14px;
    color: #fff;
    line-height: 58px;
}
.cart{
    background-color: #ffe817;
    color: #333;
}
.buy{
    background-color: #f69;
}
</style>
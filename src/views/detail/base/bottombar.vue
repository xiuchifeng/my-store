<template>
  <div class='bottom-bar'>
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
      <div class="cart" @click="addMarket">加入购物车</div>
      <div class="buy">购买</div>
    </div>
  </div>
</template>
<script>
  /*  这个需求叫做节流 :两次函数触发的时间差值必须在指定时间之外
   *   第一次点击 执行this.$emit('addMarket')
   *   第二次点击
   *     如果这次点击的时间距离第一次点击的时间在1s之内 则不执行this.$emit('addMarket')
   *     如果这次点击的时间距离第一次点击的时间在1s之外 则执行this.$emit('addMarket')
   * */
  export default {
    name: 'DetailBottomBar',
    data() {
      return {
         start:0,  //记录初始的时间
      }
    },
    methods: {
      addMarket() {//把商品数据添加到vuex
        let now = new Date()  ; //获取点击的最新时间
        if(now-this.start>=1000){
          this.$emit('addMarket')
          this.start = now  //用start记录最新的时间
        }
      }
    }
  }
</script>

<style scoped>
  .bottom-bar {
    display: flex;
    position: absolute;
    z-index: 10;
    height: 58px;
    left: 0;
    right: 0;
    bottom: -49px;
    text-align: center;
    background-color: #fff;
    box-shadow: 0 -1px 1px rgba(100, 100, 100, 0.1);
  }
  
  .bar-item {
    flex: 1;
    display: flex;
  }
  
  .bar-item > div {
    flex: 1;
  }
  
  .bar-left .text {
    font-size: 13px;
  }
  
  .bar-left .icon {
    display: block;
    width: 22px;
    height: 22px;
    margin: 10px auto 3px;
    background: url("~assets/img/detail/detail_bottom.png") 0 0/100%;
  }
  
  .bar-left .service {
    background-position: 0 -54px;
  }
  
  .bar-left .shop {
    background-position: 0 -98px;
  }
  
  .bar-right {
    font-size: 15px;
    color: #fff;
    line-height: 58px;
  }
  
  .bar-right .cart {
    background-color: #ffe817;
    color: #333;
  }
  
  .bar-right .buy {
    background-color: #f69;
  }
</style>

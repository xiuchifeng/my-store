<template>
  <div id="app">
    <!--<transition-->
    <!--:name="name"-->
    <!--&gt;-->
    <!--<router-view class="center"></router-view>-->
    <!--</transition>-->

    <common-slider-transition :name="name">
      <keep-alive exclude="Detail">
        <router-view class="center" />
      </keep-alive>
    </common-slider-transition>
    <common-main-tab-bar v-show="!$route.path.includes('detail')"/>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      name: "" //防止抖屏
    };
  },
  watch: {
    //监视路由的变化
    $route(to, from) {
      if (from.path === "/") return;
      // console.log(to,from)
      if (to.meta.index > from.meta.index) {
        this.name = "left";
      } else {
        this.name = "right";
      }
    }
  }
};
</script>

<style>

/*v-leave{  //刚开始离开*/
/*transfrom:translateX(0px)*/
/*}*/
@import "assets/css/reset.css";
@import "assets/css/public.css";
.center {
  position: absolute; 
  width: 100%;
  height: calc(100% - 49px);
}
</style>

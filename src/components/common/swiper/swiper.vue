<template>
  <div class="swiper" :style="{paddingBottom}">
    <swiper :options="swiperOption" v-if="banner.length!==0">
      <swiper-slide v-for="item in banner" :key="item.acm">
        <img :src="item" alt />
      </swiper-slide>

      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>
<script>
export default {
  name: "CommonSwiper",
  //es6的写法，相当于data:function(){return{swiperOption:{}}}
  props: {
    banner: {
      type: Array,
      default() {
        return [];
      }
    },
    paddingBottom: {
      // 这个属性用来控制轮播图的高度的
      type: String
    }
  },
  data() {
    return {
      swiperOption: {
        pagination: {
          el: ".swiper-pagination"
        },
        loop: true, //是否循环轮播
        autoplay: {
          //是否自动播放
          delay: 2000,
          disableOnInteraction: false //2秒自动播放一次
        }
      }
    };
  }
};
</script>
<style lang='less' scoped>
.swiper {
  //解决抖屏
  position: relative;
  overflow: hidden;
  height: 0;
  /*padding-bottom:52%;// 此处的百分比 是相对于width元素的width*/
}
.swiper img {
  width: 100%;
}
.swiper /deep/ .swiper-container {
  position: static;
}
/*样式穿透   如果需要在当前项目中修改第三方库的样式    */
// .swiper /deep/ .swiper-pagination-bullet-active {
//   background: red;
// }
</style>

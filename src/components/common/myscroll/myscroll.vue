<template>
  <div ref="wrapper">
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "CommonMyScroll",
  data: () => {
    return {
      scroll: null
    };
  },
  props: {
    pullUpLoad: {
      type: Boolean,
      default: false
    },
    probeType: {
      type: Number,
      default: 0
    }
  },
  mounted() {
    //滑动必须在渲染完之后才能初始化,不能在created初始化
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true, //允许在滚动区域点击
      mouseWheel: true,//鼠标拖动
      momentum: true,//
      pullUpLoad: this.pullUpLoad,
      probeType: this.probeType //启用手指触摸
    });
    this.scroll.on("pullingUp", () => {
      this.$emit("loadMore");
    });
    this.scroll.on("scroll", position => {
      this.$emit("getPosition", position);
    });
  },
  methods: {
    finishPullUp() {
      this.scroll.finishPullUp();
    },
    refresh() {
      //重新计算scroll滚动的区域
      console.log('refresh',this.scroll.scrollerHeight)
      this.scroll.refresh();
    },
    scrollTo(x, y, time) {
      this.scroll.scrollTo(x, y, time);
    }
  }
};
</script>

<style lang='less' scoped>
</style>

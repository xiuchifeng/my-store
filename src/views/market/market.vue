<template>
  <div class="market">
    <common-nav-bar>
      <template #middle>购物车({{$store.getters.productsLength}})</template>
    </common-nav-bar>
    <common-my-scroll class="wrapper" @getPosition="getPosition" :probe-type="3" ref="scroll">
      <market-list />
    </common-my-scroll>
    <market-bottom-bar />
    <back-top @backTop="backTop" v-show="isShowBackTop" :bottom="'100px'" />
  </div>
</template>

<script>
import { backTopMixin } from "utils/mixins";
import MarketList from "./base/MarketList";
import MarketBottomBar from "./base/BottomBar";

export default {
  name: "market",
  components: {
    MarketList,
    MarketBottomBar
  },
  mixins: [backTopMixin],
  created() {
    console.log(this.$store.state.products);
  },
  methods:{
            getPosition(position){
                // console.log('market组件的位置',position)
                const positionY = -position.y
                this.isShowBackTop = positionY>=100
            },
        }
};
</script>

<style scoped>
.nav-bar {
  font-weight: bold;
  color: #fff;
  background-color: lightblue;
}

.wrapper {
  /*滚动区域 */
  position: fixed;
  top: 44px;
  bottom: 93px;
  left: 0;
  right: 0;
}
</style>

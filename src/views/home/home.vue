<template>
  <div class="home">
    <common-nav-bar>
      <template #middle>首页</template>
    </common-nav-bar>

    <tab-content
      class="tab-control"
      :titles="Object.values(types)"
      @tabClick="tabClick"
      v-show="isShowTabContent"
      ref="tabContent"
    />
    <common-my-scroll
      @loadMore="loadMore"
      @getPosition="getPosition"
      :pull-upload="true"
      class="wrapper"
      ref="scroll"
    >
      <common-swiper :banner="banner" />
      <home-recommend :recommend="recommend"></home-recommend>
      <home-popular />
      <tab-content :titles="Object.values(types)" @tabClick="tabClick" ref="tabContent1" />
      <good-list :goods="goods[currentType].list" />
    </common-my-scroll>
    <back-top @backTop="backTop" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import { reqHomeImg, reqHomeGoods } from "api/home";
import { backTopMixin } from "utils/mixins";

import TabContent from "components/content/tabcontent/TabContent";
import GoodList from "components/content/goodlist/goodlist";
import HomeRecommend from "./base/recommend";
import HomePopular from "./base/popular";

export default {
  name: "home",
  data() {
    return {
      banner: [], //轮播图数据
      recommend: [], //推荐数据
      currentType: "pop",
      isShowTabContent: false,
      types: {
        pop: "流行",
        new: "新款",
        sell: "精选"
      },
      goods: {
        //商品数据
        pop: {
          list: [], //流行选项  对应的数据
          page: 0 //记录请求了第几页的流行数据
        },
        new: {
          //新款的数据
          list: [],
          page: 0
        },
        sell: {
          //精选的数据
          list: [],
          page: 0
        }
      }
    };
  },
  created() {
    this.getHomeData();
    Object.keys(this.types).forEach(type => this.getHomeGoods(type));
  },
  mounted(){
      const debounce = function (fn,time) {
                let timer = null
                return function () {
                    clearTimeout(timer)
                    timer = setTimeout(fn,time)
                }
            }   //防抖,让scroll刷新频率降低点
             
            const fresh = debounce(this.$refs.scroll.refresh,200)
            
            // this.$bus.$on('imgLoad',this.$refs.scroll.refresh)
            this.$bus.$on('imgLoad',fresh)
  },
  components: {
    TabContent,
    GoodList,
    HomeRecommend,
    HomePopular
  },
  mixins: [backTopMixin],
  methods: {
    async getHomeData() {
      const result = await reqHomeImg();
      var data = result.data;
      this.banner = data.banner.list.map(item => item.image);
      this.recommend = data.recommend.list;
    },
    async getHomeGoods(type) {
      const page = ++this.goods[type].page;
      const result = await reqHomeGoods(type, page);
      this.goods[type].list.push(...result.data.list);
    },
    tabClick(index) {
      this.$refs.tabContent.currentIndex = this.$refs.tabContent1.currentIndex = index;
      this.currentType = Object.keys(this.types)[index];
    },
    loadMore() {
      this.getHomeGoods(this.currentType);
      this.$refs.scroll.finishPullUp();
    },
    getPosition(position) {
      // console.log(position)
      const positionY = -position.y;

      const isShowTabContent =
        positionY >= this.$refs.tabContent1.$el.offsetTop;
      // if(isShowTabControl){
      //     // console.log('吸顶')
      //     this.isShowTabControl = true;
      // }else{
      //     this.isShowTabControl = false;
      // }
      this.isShowTabContent = isShowTabContent;

      if (positionY >= 1000) {
        this.isShowBackTop = true;
      } else {
        this.isShowBackTop = false;
      }
    }
  }
};
</script>

<style scoped lang="less">
.nav-bar {
  font-weight: bold;
  color: #fff;
  background-color: lightblue;
}
.wrapper {
  /*滚动区域 */
  position: fixed;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
.tab-control {
  position: relative;
  z-index: 1;
  background-color: #fff;
}
</style>

<template>
  <div class="detail">
    <detail-nav-bar ref="navbar" @getPosition="getPosition" @itemClick="itemClick" />

    <common-my-scroll ref="scroll" :probe-type="3" @getPosition="getPosition" class="wrapper">
      <common-swiper :padding-bottom="'80%'" :banner="banner" />
      <detail-good-info :good-info="goodInfo" />
      <detail-shop-info :shop="shopInfo" />
      <detail-image-info @imgLoad="imgLoad" :image-info="imageInfo" />
      <detail-params-info ref="params" :params-info="paramsInfo" />
      <detail-comment-info ref="comment" :comment-info="commentInfo" />
      <goods-list ref="goods" :goods="recommendInfo" />
    </common-my-scroll>
    <detail-bottom-bar @addMarket="addMarket" />
    <back-top @backTop="backTop" v-show="isShowBackTop" />
  </div>
</template>

<script>
import {
  reqDetails,
  GoodsInfo,
  ShopInfo,
  GoodsParam,
  CommentInfo,
  reqRecommends
} from "api/detail";

import GoodsList from "components/content/goodlist/goodlist";
import { backTopMixin } from "utils/mixins";

import DetailBottomBar from "./base/bottombar";
import DetailNavBar from "./base/navbar";
import DetailGoodInfo from "./base/goodsinfo";
import DetailShopInfo from "./base/shopinfo";
import DetailImageInfo from "./base/imageinfo";
import DetailParamsInfo from "./base/paramsinfo";
import DetailCommentInfo from "./base/commentinfo";

export default {
  name: "Detail",
  components: {
    GoodsList,
    DetailBottomBar,
    DetailNavBar,
    DetailGoodInfo,
    DetailShopInfo,
    DetailImageInfo,
    DetailParamsInfo,
    DetailCommentInfo
  },
  mixins: [backTopMixin],
  created() {
    this.getDetails();
    this.getRecommends();
  },
  data() {
    return {
      banner: [],
      goodInfo: {},
      shopInfo: {},
      imageInfo: {},
      paramsInfo: {},
      commentInfo: {},
      recommendInfo: [],
      offsetTopList: [],
      iid: ""
      //内部的offsetTop 需要在前面几个组件渲染后获取
    };
  },
  methods: {
    async getDetails() {
      const iid = (this.iid = this.$route.params.iid);

      const { result } = await reqDetails(iid);
      //轮播图数据  数组的们每一项是图片的src

      //商品信息
      this.goodInfo = new GoodsInfo(
        result.itemInfo,
        result.columns,
        result.shopInfo.services
      );
      //商铺信息
      this.shopInfo = result.shopInfo;

      //商品图片信息
      this.imageInfo = result.detailInfo;

      //参数信息
      this.paramsInfo = new GoodsParam(
        result.itemParams.info,
        result.itemParams.rule
      );

      //评论信息
      if (result.rate.cRate !== 0) {
        this.commentInfo = new CommentInfo(result.rate.list[0]);
      }
      this.banner = result.itemInfo.topImages;
    },
    async getRecommends() {
      const result = await reqRecommends();
      // console.log(result)
      //获取推荐的图片数据
      this.recommendInfo = result.data.list;
    },
    itemClick(index) {
      this.offsetTopList = [];
      this.offsetTopList.push(
        0,
        this.$refs.params.$el.offsetTop,
        this.$refs.comment.$el.offsetTop,
        this.$refs.goods.$el.offsetTop,
        Number.MAX_VALUE
      );
      // console.log(this.offsetTopList)
      //如何获取 不同index对应的不同的滚动位置
      this.$refs.scroll.scrollTo(0, -this.offsetTopList[index], 200);
    },
    imgLoad(count) {
      this.offsetTopList.push(
        0,
        this.$refs.params.$el.offsetTop,
        this.$refs.comment.$el.offsetTop,
        this.$refs.goods.$el.offsetTop,
        Number.MAX_VALUE
      );
      console.log(`第${count}图片加载完成`, this.offsetTopList);
    },
    getPosition(position) {
      const positionY = -position.y;
      // console.log(this.offsetTopList,positionY,this.$refs.navbar.currentIndex);
      this.isShowBackTop = positionY > 1000;
      const [
        a,
        paramsOffsetTop,
        commentOffsetTop,
        goodsOffsetTop
      ] = this.offsetTopList;
      for (let i in this.offsetTopList) {
        if (+i == this.offsetTopList.length - 1) break;
        let currentIndex = this.$refs.navbar.currentIndex;
        if (
          currentIndex != i &&
          positionY >= this.offsetTopList[+i] &&
          positionY <= this.offsetTopList[+i + 1]
        ) {
          this.$refs.navbar.currentIndex = +i;
        }
      }
      this.isShowBackTop = positionY >= 1000;
    },
    addMarket() {
      //把商品数据添加到购物车里面
      //整合商品信息
      const product = {};
      product.image = this.banner[0];
      product.title = this.goodInfo.title;
      product.desc = this.goodInfo.desc;
      product.price = this.goodInfo.realPrice;
      product.iid = this.iid;
      console.log("指向", this);

      // console.log(product)
      this.$store.commit("addMarket", product);
      this.$toast.show(`购物车中的数量为${this.count(this.iid)}`);
      // console.log(this.$store.getters.count)
    }
  },
  computed: {}
};
</script>

<style lang='less' scoped>
.wrapper {
  //设置better-scroll滚动区域的高度
  /*height:calc(100% - 44px);*/
  /*height: calc(~"100vh - 93px"); // less会导致编译的css不一样   可以百度less中使用calc 就会找到解决方法了*/
  position: fixed;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>

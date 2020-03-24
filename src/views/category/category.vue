<template>
  <div class="category">
    <common-nav-bar>
      <template #middle>分类</template>
    </common-nav-bar>

    <common-my-scroll class="container1">
      <category-left-nav @itemClick="itemClick" :categorys="categorys" />
    </common-my-scroll>

    <common-my-scroll class="container2" ref="scroll">
      <category-grid-view :subcategory="subcategory" />
      <tab-content @tabClick="tabClick" :titles="Object.values(types)" />/>
      <good-list :goods="goods[currentType].list" />
    </common-my-scroll>
  </div>
</template>

<script>
import { reqCategory, reqSubcategory, reqCategoryDetail } from "api/category";
import { noshake } from "utils/index";
import CategoryLeftNav from "./base/LeftNav";
import CategoryGridView from "./base/GridView";
import TabContent from "components/content/tabcontent/TabContent";
import GoodList from "components/content/goodlist/goodlist";

export default {
  name: "category",
  created() {
    this.getCategory();
  },
  components: {
    CategoryLeftNav,
    CategoryGridView,
    TabContent,
    GoodList
  },
  data() {
    return {
      categorys: [], //存储左侧滚动区域的数据
      subcategory: [], //储存右侧subcategory(顶部)的数据
      currentIndex: 0,
      currentType: "pop",
      types: {
        pop: "综合",
        new: "新款",
        sell: "销量"
      }, //定义商品类型的数据
      goods: {
        pop: {
          list: []
        },
        new: {
          list: []
        },
        sell: {
          list: []
        }
      }
    };
  },

  methods: {
    async getCategory() {
      const result = await reqCategory();
      this.categorys = result.data.category.list;
      this.getSubcategory();
      //请求右侧下面的数据  用于渲染GoodsList  基于指定商品的miniWallkey
      Object.keys(this.types).forEach(this.getSubCategoryDetail);
    },
    async getSubcategory() {
      const { maitKey } = this.categorys[this.currentIndex];
      const result = await reqSubcategory(maitKey);
      this.subcategory = result.data.list;
    },
    async getSubCategoryDetail(type) {
      const { miniWallkey } = this.categorys[this.currentIndex];
      const result = await reqCategoryDetail(miniWallkey, type);
      this.goods[type].list = result;
    },
    itemClick(index) {
      if (index === this.currentIndex) return;
      this.currentIndex = index;
      Object.keys(this.types).forEach(this.getSubCategoryDetail);
      console.log(Object.values(this.types));
      console.log(Object.keys(this.types));

      this.getSubcategory();
    },
    tabClick(index) {
      this.currentType = this.typeList[index];
    }
  }
};
</script>

<style scoped>
.nav-bar {
  font-weight: bold;
  color: #fff;
  background-color: lightblue;
}
.container1 {
  position: fixed;
  top: 44px;
  bottom: 49px;
  width: 100px;
}

.container2 {
  position: fixed;
  top: 44px;
  bottom: 49px;
  right: 0;
  left: 100px;
}
</style>



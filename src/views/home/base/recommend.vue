<template>
  <ul class="home-recommend">
      <li class="recommend-item" v-for="item in recommend" :key="item.acm">
          <img :src="item.image" alt="">
          <p>{{item.title}}</p>
      </li>
  </ul>
</template>

<script>
export default {
  name: "HomeRecommend",
  components: {},
  props: {
    recommend: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  created(){
     
  },
  data() {
    return {};
  },
  methods: {
  },
  computed: {}
};
</script>

<style lang='less' scoped>
.home-recommend{
    display: flex;
    font-size: 12px;
    padding: 15px 0 30px;
    border-bottom: 8px solid #eee;
    text-align:center;
    .recommend-item{
      flex:1;
      img{
        width: 80%;
      }
      p{
        padding-top:10px;
      }
    }
  }
</style>
</style>

<template>
  <div class='back-top' @click="backTop">
    <img src="~assets/img/common/top.png" alt="">
  </div>
</template>

<script>
    export default {
        name:'BackTop',
        components:{

        },
      
        methods:{
            backTop(){
                this.$emit("backTop")
            }
        },
       
    }
</script>

<style lang='less' scoped>
 .back-top {
    position: fixed;
    width: 50px;
    height: 50px;
    right: 10px;
     bottom: 60px;
  }
  
  .back-top img {
    width: 50px;
  }
</style>

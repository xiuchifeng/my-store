<template>
  <div class='good-list'>
    <good-item v-for="item in goods" :goods-info="item" ></good-item>
  </div>
</template>

<script>
  import GoodItem from './gooditem'
    export default {
        name: "GoodList",
        props:{
            goods:{
                type:Array,
                default(){
                    return []
                }
            }
        },
        components:{
            GoodItem
        }
    }
</script>

<style scoped>
  .good-list{
    display: flex;
    flex-wrap:wrap;
    justify-content: space-around;
  }
</style>

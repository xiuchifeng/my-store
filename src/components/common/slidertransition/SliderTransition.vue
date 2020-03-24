<template>
  <div class='SliderTransition'>
      <transition :name="name">
        <slot/>
      </transition>
  </div>
</template>

<script>
    export default {
        name: "CommonSliderTransition",
        props:{
            name:{
                type:String
            }
        }
    }
</script>

<style lang="less" scoped>
  
  .left-leave-active{ //离开的过程中
    transform:translateX(0px);
    transition:1s;
  }
  .left-leave-to{   //离开的最后一刻
    transform:translateX(-100%)
  }
  
  .left-enter-active{ //进入的过程中
    transform:translateX(100%);
    transition:1s;
  }
  .left-enter-to{   //进入的最后一刻
    transform:translateX(0)
  }
  
  .right-leave-active{ //离开的过程中
    transform:translateX(0px);
    transition:1s;
  }
  .right-leave-to{   //离开的最后一刻
    transform:translateX(100%)
  }
  
  .right-enter-active{ //进入的过程中
    transform:translateX(-100%);
    transition:1s;
  }
  .right-enter-to{   //进入的最后一刻
    transform:translateX(0)
  }

</style>

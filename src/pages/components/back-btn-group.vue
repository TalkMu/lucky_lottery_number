<template>
  <view class="btn-container">
    <button type="primary" @tap="backHome">返回主页</button>
    <button type="primary" @tap="shareFriends">分享朋友</button>
  </view>
</template>

<script>
import Taro from "@tarojs/taro";
import './index.scss'
export default {
  name: "index",
  methods:{
    backHome(){
      Taro.navigateBack();
    },
    shareFriends(){

    }
  }
}
</script>

<style scoped>

</style>

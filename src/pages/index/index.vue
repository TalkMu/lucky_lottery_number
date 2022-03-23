<template>
  <view class="container">
    <view class="btn-container">
      <button type="primary" @tap="toK8">快乐8生肖</button>
      <button type="primary" @tap="toTwoColorBall">双色球生肖</button>
    </view>
  </view>
</template>

<script>
import "./index.scss";
import Taro, { Events } from '@tarojs/taro'
export default {
  data() {
    return {
      msg: "Hello world!",
    };
  },
  methods:{
    toK8(){
      Taro.navigateTo({
        url: '/pages/k8/index',
      })
    },
    toTwoColorBall(){
      Taro.navigateTo({
        url: '/pages/twoColorBall/index',
      })
    }

  }
};
</script>

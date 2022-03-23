<template>
  <view class="container">
    <view class="title-container">
      <text class="title">第2022023期</text>
      <text class="title">吉祥号值得来一套</text>
      <view class="detail">
        <text>每周二、四、日开奖</text>
        <text>20:00 停售，21:15 开奖</text>
      </view>
    </view>
    <view class="number-container">
      <view class="number-item" v-for="n in 12">
        <text class="title">虎虎生威:</text>
        <text class="number">12</text>
        <text class="number">12</text>
        <text class="number">12</text>
        <text class="number">12</text>
        <text class="number">12</text>
        <text class="number">12</text>
        <text class="number">12</text>
        <text class="number">12</text>
        <text class="number">12</text>
        <text class="number">12</text>
      </view>
    </view>
  </view>
</template>

<script>
import "./index.scss";

export default {
  data() {
    return {
      msg: "Hello world!",
    };
  },
};
</script>

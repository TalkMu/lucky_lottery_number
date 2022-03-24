<template>
  <view class="container">
    <view class="title-container">
      <text class="title">{{ pageData.data.date }}</text>
      <text class="title">{{ pageData.slogan }}</text>
      <view class="sub-slogan">
        <text>{{ pageData.subSlogan.oneText }}</text>
        <text>{{ pageData.subSlogan.twoText }}</text>
        <text>{{ pageData.subSlogan.threeText }}</text>
      </view>
    </view>
    <view class="number-container">
      <view class="number-item" v-for="(item,index) in pageData.data.list" :key="index">
        <view class="title">{{ item.title }}:</view>
        <view class="number-row">
          <text :class="'number ' + [item.numbers != null && (item.numbers.length - (i+1) <2)?'blue':'red']"
                v-for="(itemNumber,i) in item.numbers" :key="i"
          >
            {{ itemNumber.number }}
          </text>
        </view>
      </view>
      <view class="explain">
        <text>{{ pageData.explain }}</text>
      </view>
    </view>
    <view class="btn-container">
      <button type="primary" @tap="backHome">返回主页</button>
      <button type="primary" openType="share">分享朋友</button>
    </view>
  </view>
</template>

<script>
import "./index.scss";
import Taro from '@tarojs/taro'
import {randomNumStr} from "../../helper"
let interstitialAd = null
export default {
  data() {
    return {
      msg: "Hello world!",
      pageData: {
        slogan:null,
        subSlogan:{
          oneText:null,
          twoText:null,
          threeText:null,
        },
        data:{
          date:"星期二生肖",
          list:[{
            title:null,
            numbers:[]
          }]
        },
        explain:null,
      },
    };
  },
  created() {
  },
  methods: {
    initData() {
      const that = this;
      Taro.request({
        url: 'https://www.kxindian.com/json/lucky_lottery_number/twoColorBall.json', //仅为示例，并非真实的接口地址
        method: "get",
        success: function (res) {
          that.pageData = res.data;
          const key = "twoColorBall-data";
          // const key = randomNum(1,80).toString();
          const data = Taro.getStorageSync(key);

          if (data == null || data == "") {
            that.generateNumberData();
          } else {
            const week = that.getWeek();
            if (week == data.date){
              that.pageData.data = data;
            }else {
              that.generateNumberData()
            }
          }
          setTimeout(function () {
            interstitialAd.show().catch((err) => {
              console.error(err)
            }, 1000 * 5)
          })
        }
      })

    },
    backHome() {
      Taro.navigateBack();
    },
    generateNumberData() {
      const key = "twoColorBall-data";
      for (let item of this.pageData.data.list) {
        // 7个红球
        const redArr = new Set();
        while (redArr.size < 7) {
          let num = randomNumStr(1, 33);
          redArr.add(num)
        }
        for (let num of redArr) {
          item.numbers.push({
            number: num
          })
        }
        // 2个蓝球
        const blueArr = new Set();
        while (blueArr.size < 2) {
          let num = randomNumStr(1, 16);
          blueArr.add(num)
        }
        for (let num of blueArr) {
          item.numbers.push({
            number: num
          })
        }
      }
      this.pageData.data.date = this.getWeek();
      Taro.setStorageSync(key, this.pageData.data);
    },
    /**
     * 获取下一次双色球开奖星期几
     * @returns {string}
     */
    getWeek() {
      const week = new Date().getDay();
      let title;
      switch (week) {
        case 1, 2:
          title = "星期二生肖";
          break;
        case 3, 4:
          title = "星期四生肖";
          break;
        case 5, 6, 0:
          title = "星期日生肖";
          break;
      }
      return title;
    }
  },
  // 对应 onShow
  onShow() {
    this.initData();
  },
  onLoad(){
    if (Taro.createInterstitialAd) {
      interstitialAd = Taro.createInterstitialAd({
        adUnitId: 'adunit-cad178654b9578c7'
      })

      interstitialAd.onLoad(() => {
        console.log('插屏 广告加载成功')
      })
      interstitialAd.onError(err => {
        console.log(err)
      })
      interstitialAd.onClose(res => {
        console.log('插屏 广告关闭')
      })
    }
  },
  onShareTimeline() {
    return {
      title: "快8生肖、幸运号码、幸运生肖选号",
      imageUrl: "",
    }
  },
  onShareAppMessage(res) {
    return {
      title: '生肖幸运号码',
      path: '/pages/twoColorBall/index'
    }
  }
};
</script>

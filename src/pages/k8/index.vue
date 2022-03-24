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
          <text class="number" v-for="(item,i) in item.numbers" :key="i">
            {{ item.number }}
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
import Taro, {Events} from '@tarojs/taro'
import {randomNum, formatDate} from "../../helper"

let interstitialAd = null
export default {
  data() {
    return {
      msg: "Hello world!",
      pageData: {
        title: "快8生肖",
        phase: "2022023",
        slogan: "吉祥号值得来一套",
        subSlogan: {
          oneText: "天天开奖",
          twoText: "21:00 停售，21:15 开奖",
          threeText: "简单又好中 惊喜五百万",
        },
        data: {
          date: null,
          list: [
            {
              title: "玉鼠送财",
              numbers: []
            },
            {
              title: "牛气冲天",
              numbers: []
            },
            {
              title: "虎虎生威",
              numbers: []
            },
            {
              title: "前兔无量",
              numbers: []
            },
            {
              title: "龙凤呈祥",
              numbers: []
            },
            {
              title: "金蛇祥端",
              numbers: []
            },
            {
              title: "马上发财",
              numbers: []
            },
            {
              title: "三羊开泰",
              numbers: []
            },
            {
              title: "金猴进宝",
              numbers: []
            },
            {
              title: "吉祥如意",
              numbers: []
            },
            {
              title: "旺旺来财",
              numbers: []
            }
            ,
            {
              title: "猪事顺心",
              numbers: []
            }
          ]
        },
        explain: "选九复式+选十单式为一套22元 最高可中800万\n本系统多次出现单注中8码，坚持可期待全中哟"
      },
    };
  },
  created() {
  },
  methods: {
    initData() {
      const that = this;
      Taro.request({
        url: 'https://www.kxindian.com/json/lucky_lottery_number/k8.json', //仅为示例，并非真实的接口地址
        method: "get",
        success: function (res) {
          that.pageData = res.data;
          const key = "k8-data";
          // const key = randomNum(1,80).toString();
          const data = Taro.getStorageSync(key);
          if (data == null || data == "") {
            that.generateNumberData();
            // console.log("不存在K8数据")
          } else {
            const nodeDate = formatDate(new Date(), "yyyy年MM月dd日");
            if (nodeDate == data.date) {
              that.pageData.data = data;
              // console.log("使用K8缓存数据")
            } else {
              // console.log("K8数据已过期")
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
    generateNumberData() {
      const key = "k8-data";
      for (let item of this.pageData.data.list) {
        const arr = new Set();
        while (arr.size < 10) {
          let num = randomNum(1, 80);
          if (num < 10) {
            num = "0" + num
          }
          arr.add(num)
        }
        for (let num of arr) {
          item.numbers.push({
            number: num
          })
        }
      }
      this.pageData.data.date = formatDate(new Date(), "yyyy年MM月dd日");
      Taro.setStorageSync(key, this.pageData.data);
    },
    backHome() {
      Taro.navigateBack();
    },
    shareFriends() {

    }
  },
  // 对应 onShow
  onShow() {
    this.initData();
  },
  onLoad() {
    if (Taro.createInterstitialAd) {
      interstitialAd = Taro.createInterstitialAd({
        adUnitId: 'adunit-1ab0304b6d7887bf'
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
      path: '/pages/k8/index'
    }
  }
};
</script>

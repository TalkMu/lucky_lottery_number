<template>
  <view class="container">
    <view class="title-container">
      <text class="title">第{{pageData.phase}}期</text>
      <text class="title">{{pageData.slogan}}</text>
      <view class="sub-slogan">
        <text>{{pageData.subSlogan.oneText}}</text>
        <text>{{pageData.subSlogan.twoText}}</text>
        <text>{{pageData.subSlogan.threeText}}</text>
      </view>
    </view>
    <view class="number-container">
      <view class="number-item" v-for="(item,index) in pageData.numberList" :key="index">
        <view class="title">{{item.title}}:</view>
        <view class="number-row">
          <text class="number" v-for="(item,i) in item.numbers" :key="i">
            {{item.number}}
          </text>
        </view>
      </view>
      <view class="explain">
        <text>{{pageData.explain}}</text>
      </view>
    </view>
  </view>
</template>

<script>
  import "./index.scss";
  import Taro, { Events } from '@tarojs/taro'
  import {randomNum,formatDate} from "../../helper"
  export default {
    data() {
      return {
        msg: "Hello world!",
        pageData:{
          title:"快8生肖",
          phase:"2022023",
          slogan:"吉祥号值得来一套",
          subSlogan:{
            oneText:"天天开奖",
            twoText:"21:00 停售，21:15 开奖",
            threeText:"简单又好中 惊喜五百万",
          },
          numberList:[
            {
              title:"玉鼠送财",
              numbers:[]
            },
            {
              title:"牛气冲天",
              numbers:[]
            },
            {
              title:"虎虎生威",
              numbers:[]
            },
            {
              title:"前兔无量",
              numbers:[]
            },
            {
              title:"龙凤呈祥",
              numbers:[]
            },
            {
              title:"金蛇祥端",
              numbers:[]
            },
            {
              title:"马上发财",
              numbers:[]
            },
            {
              title:"三羊开泰",
              numbers:[]
            },
            {
              title:"金猴进宝",
              numbers:[]
            },
            {
              title:"吉祥如意",
              numbers:[]
            },
            {
              title:"旺旺来财",
              numbers:[]
            }
            ,
            {
              title:"猪事顺心",
              numbers:[]
            }
          ],
          explain:"选九复式+选十单式为一套22元 最高可中800万\n本系统多次出现单注中8码，坚持可期待全中哟"
        }
      };
    },
    created() {
    },
    methods:{
      initData(){
        const that = this;
        Taro.request({
          url: 'https://file.sdfykjyxgs.cn/json/lucky_lottery_number/k8.json', //仅为示例，并非真实的接口地址
          method:"get",
          success: function (res) {
            that.pageData = res.data;
            const key = formatDate(new Date(),"yyyyMMdd");
            // const key = randomNum(1,80).toString();
            const val = Taro.getStorageSync(key);

            if (val == null || val == ""){

              for (let item of that.pageData.numberList) {
                const arr = new Set();
                while (arr.size<10){
                  let num = randomNum(1,80);
                  if (num<10){
                    num = "0" + num
                  }
                  arr.add(num)
                }
                for (let num of arr) {
                  item.numbers.push({
                    number:num
                  })
                }
              }
              Taro.setStorageSync(key,this.pageData.numberList);
            }else {
              this.pageData.numberList = val;
            }
          }
        })

      }
    },
    // 对应 onShow
    onShow () {
      this.initData();
    },
  };
</script>

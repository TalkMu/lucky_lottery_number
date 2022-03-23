<template>
  <view class="container">
    <view class="title-container">
      <text class="title">第2022023期</text>
      <text class="title">吉祥号值得来一套</text>
      <view class="detail">
        <text>天天开奖</text>
        <text>21:00 停售，21:15 开奖</text>
        <text>简单又好中 惊喜五百万</text>
      </view>
    </view>
    <view class="number-container">
      <view class="number-item" v-for="(item,index) in numberData" :key="index">
        <view class="title">{{item.title}}:</view>
        <view class="number-row">
          <text class="number" v-for="(item,i) in item.numbers" :key="i">
            {{item.number}}
          </text>
        </view>
      </view>
      <view class="describe">
        <text>选九复式+选十单式为一套22元 最高可中800万</text>
        <text>本系统多次出现单注中8码，坚持可期待全中哟</text>
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
        numberData:[],

      };
    },
    created() {
    },
    methods:{
      initData(){
        const key = formatDate(new Date(),"yyyyMMdd");
        // const key = randomNum(1,80).toString();
        const val = Taro.getStorageSync(key);

        if (val == null || val == ""){
          let numberList = [
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
          ];
          for (let item of numberList) {
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
          this.numberData = numberList;
          Taro.setStorageSync(key,JSON.stringify(numberList));
        }else {
          this.numberData = JSON.parse(val);
        }
      }
    },
    // 对应 onShow
    onShow () {
      this.initData();
    },
  };
</script>

<template>
  <view class="container">
    <view class="title-container">
      <text class="title">生肖幸运数字</text>
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
          explain:""
        }
      };
    },
    created() {
    },
    methods:{
      initData(){
        const that = this;
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

      },
    },
    // 对应 onShow
    onShow () {
      this.initData();
    },
  };
</script>

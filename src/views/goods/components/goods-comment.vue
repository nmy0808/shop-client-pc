<template>
  <div class='goods-comment'>
    <div class='head'>
      <div class='data'>
        <p><span>100</span><span>人购买</span></p>
        <p><span>99.99%</span><span>好评率</span></p>
      </div>
      <div class='tags'>
        <div class='dt'>大家都在说：</div>
        <div class='dd'>
          <a href='javascript:;' class='active'>全部评价（1000）</a>
          <a href='javascript:;'>好吃（1000）</a>
          <a href='javascript:;'>便宜（1000）</a>
          <a href='javascript:;'>很好（1000）</a>
          <a href='javascript:;'>再来一次（1000）</a>
          <a href='javascript:;'>快递棒（1000）</a>
        </div>
      </div>
    </div>
    <div class='sort'>
      <span>排序：</span>
      <a href='javascript:;' class='active'>默认</a>
      <a href='javascript:;'>最新</a>
      <a href='javascript:;'>最热</a>
    </div>
    <!-- 列表-->
    <div class='list'>
      <div class='item'>
        <div class='user'>
          <img src='http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/avatar_1.png' alt=''>
          <span>兔****m</span>
        </div>
        <div class='body'>
          <div class='score'>
            <i class='iconfont icon-wjx01'></i>
            <i class='iconfont icon-wjx01'></i>
            <i class='iconfont icon-wjx01'></i>
            <i class='iconfont icon-wjx01'></i>
            <i class='iconfont icon-wjx02'></i>
            <span class='attr'>颜色：黑色 尺码：M</span>
          </div>
          <div class='text'>网易云app上这款耳机非常不错 新人下载网易云购买这款耳机优惠大 而且耳机🎧确实正品 音质特别好 戴上这款耳机 听音乐看电影效果声音真是太棒了 无线方便 小盒自动充电
            最主要是质量好音质棒 想要买耳机的放心拍 音效巴巴滴 老棒了
          </div>
          <!--评论图片浏览组件-->
          <goods-comment-image v-if='1'></goods-comment-image>
          <div class='time'>
            <span>2020-10-10 10:11:22</span>
            <span class='zan'><i class='iconfont icon-dianzan'></i>100</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import GoodsCommentImage from '@/views/goods/components/goods-comment-image'
import { inject } from 'vue'

export default {
  name: 'GoodsComment',
  components: { GoodsCommentImage },
  setup() {
    const goods = inject('goodDetail')
    console.log(goods.value)
    return {
      goods
    }
  }
}
</script>
<style scoped lang='less'>
.goods-comment {
  .head {
    display: flex;
    padding: 30px 0;

    .data {
      width: 340px;
      display: flex;
      padding: 20px;

      p {
        flex: 1;
        text-align: center;

        span {
          display: block;

          &:first-child {
            font-size: 32px;
            color: @priceColor;
          }

          &:last-child {
            color: #999;
          }
        }
      }
    }

    .tags {
      flex: 1;
      display: flex;
      border-left: 1px solid #f5f5f5;

      .dt {
        font-weight: bold;
        width: 100px;
        text-align: right;
        line-height: 42px;
      }

      .dd {
        flex: 1;
        display: flex;
        flex-wrap: wrap;

        > a {
          width: 132px;
          height: 42px;
          margin-left: 20px;
          margin-bottom: 20px;
          border-radius: 4px;
          border: 1px solid #e4e4e4;
          background: #f5f5f5;
          color: #999;
          text-align: center;
          line-height: 40px;

          &:hover {
            border-color: @mainColor;
            background: lighten(@mainColor, 50%);
            color: @mainColor;
          }

          &.active {
            border-color: @mainColor;
            background: @mainColor;
            color: #fff;
          }
        }
      }
    }
  }

  .sort {
    height: 60px;
    line-height: 60px;
    border-top: 1px solid #f5f5f5;
    border-bottom: 1px solid #f5f5f5;
    margin: 0 20px;
    color: #666;

    > span {
      margin-left: 20px;
    }

    > a {
      margin-left: 30px;

      &.active, &:hover {
        color: @mainColor;
      }
    }
  }

  .list {
    padding: 0 20px;

    .item {
      display: flex;
      padding: 25px 10px;
      border-bottom: 1px solid #f5f5f5;

      .user {
        width: 160px;

        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          overflow: hidden;
        }

        span {
          padding-left: 10px;
          color: #666;
        }
      }

      .body {
        flex: 1;

        .score {
          line-height: 40px;

          .iconfont {
            color: #ff9240;
            padding-right: 3px;
          }

          .attr {
            padding-left: 10px;
            color: #666;
          }
        }
      }

      .text {
        color: #666;
        line-height: 24px;
      }

      .time {
        color: #999;
        display: flex;
        justify-content: space-between;
        margin-top: 5px;
      }
    }
  }
}
</style>

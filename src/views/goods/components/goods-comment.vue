<template>
  <div class='goods-comment' v-if='goodInfo'>
    <div class='head'>
      <div class='data'>
        <p><span>{{ goodInfo.salesCount }}</span><span>人购买</span></p>
        <p><span>{{ goodInfo.praisePercent }}</span><span>好评率</span></p>
      </div>
      <div class='tags'>
        <div class='dt'>大家都在说：</div>
        <div class='dd'>
          <a href='javascript:;'
             @click='handleSelectedTag(null)'
             :class='{active:tagActiveIndex === -1}'>全部评价（{{ goodInfo.evaluateCount }}）
          </a>
          <a v-for='(item,index) in goodInfo.tags'
             :key='item.title'
             :class='{active:tagActiveIndex === index}'
             @click='handleSelectedTag(item)'
             href='javascript:;'>
            {{ item.title }}（{{ item.tagCount }}）
          </a>
        </div>
      </div>
    </div>
    <div class='sort'>
      <span>排序：</span>
      <a href='javascript:;' :class='{active:sortActiveIndex === 0}' @click='handSort(null, 0)'>默认</a>
      <a href='javascript:;' :class='{active:sortActiveIndex === 1}' @click='handSort("createTime", 1)'>最新</a>
      <a href='javascript:;' :class='{active:sortActiveIndex === 2}' @click='handSort("praiseCount", 2)'>最热</a>
    </div>
    <!-- 列表-->
    <div class='list' v-if='list.length'>
      <div class='item' v-for='item in list' :key='item.id'>
        <div class='user'>
          <img :src='item.member.avatar' alt=''>
          <span>{{ item.member.nickname }}</span>
        </div>
        <div class='body'>
          <div class='score'>
            <i class='iconfont icon-wjx01' v-for='s in item.score' :key='s'></i>
            <i class='iconfont icon-wjx02' v-for='s in (5-item.score)' :key='s+"1"'></i>
            <span class='attr'>{{ toSpecs(item.orderInfo.specs) }}</span>
          </div>
          <div class='text'>
            {{ item.content }}
          </div>
          <!--评论图片浏览组件-->
          <goods-comment-image v-if='1'></goods-comment-image>
          <div class='time'>
            <span>{{ item.createTime }}</span>
            <span class='zan'><i class='iconfont icon-dianzan'></i>{{ item.praiseCount }}</span>
          </div>
        </div>
      </div>
    </div>
    <c-pagination
      @current-change='handleChangePage'
      :current-page='param.page'
      :page-size='param.pageSize'
      :total='pageTotal' />
  </div>
</template>
<script>
import GoodsCommentImage from '@/views/goods/components/goods-comment-image'
import { inject, reactive, ref, watch, watchEffect } from 'vue'
import { getGoodEvaluateApi, getGoodEvaluatePageApi } from '@/api'
import { useRoute } from 'vue-router'

export default {
  name: 'GoodsComment',
  components: { GoodsCommentImage },
  setup() {
    const goods = inject('goodDetail')
    const id = ref(null)
    const route = useRoute()
    const goodInfo = ref({
      evaluateCount: 0,
      hasPictureCount: 0,
      praisePercent: '100%',
      salesCount: ''
    })
    const param = reactive({
      page: 1,
      pageSize: 10,
      hasPicture: null,
      tag: null, // 标签
      sortField: null, // 排序字段，可选值范围[praiseCount,createTime]
      sortMethod: 'desc'// 排序方法，可选值范围[asc,desc],默认为desc
    })
    const pageTotal = ref(0)
    // 评论列表
    const list = ref([])
    // 当前激活的tag筛选
    const tagActiveIndex = ref(-1)
    const sortActiveIndex = ref(0)
    // 事件: 筛选字段 `空, 有图, tage`
    const handleSelectedTag = (tag) => {
      param.tag = null
      param.hasPicture = null
      param.page = 1
      if (tag && tag.title === '有图') {
        param.hasPicture = true
      } else if (tag) {
        param.tag = tag.title
      }
      // 激活状态
      if (!tag) {
        tagActiveIndex.value = -1
      } else {
        tagActiveIndex.value = goodInfo.value.tags.findIndex(it => it.title === tag.title)
      }
      // 请求数据
      getGoodEvaluateList()
    }
    // 事件; 排序
    const handSort = (sort, index) => {
      sortActiveIndex.value = index
      param.sortField = sort
      param.page = 1
      // 请求数据
      getGoodEvaluateList()
    }
    // 事件: 分页
    const handleChangePage = (page) => {
      param.page = page
      getGoodEvaluateList()
    }
    watch(() => route.params.id, () => {
      id.value = route.params.id
      if (route.name !== 'product' || id.value === 'undefined' || !id.value) return
      // 初始化请求参数
      initParam()
      goodInfo.value = null
      list.value = []
      getGoodEvaluate()
      getGoodEvaluateList()
    }, { immediate: true })

    // 获取评价参数
    async function getGoodEvaluate() {
      goodInfo.value = await getGoodEvaluateApi({ id: id.value })
      goodInfo.value.tags.unshift({ title: '有图', tagCount: goodInfo.value.hasPictureCount })
    }

    // 分页获取评价列表
    async function getGoodEvaluateList() {
      const { counts, items, page, pages } = await getGoodEvaluatePageApi({ id: id.value, ...param })
      pageTotal.value = counts
      list.value = items
    }

    function toSpecs(spec) {
      return spec.reduce((p, c) => `${p} ${c.name}:${c.nameValue}`, '').trim()
    }

    // 初始化请求参数
    function initParam() {
      const initial = {
        page: 1,
        pageSize: 10,
        hasPicture: null,
        tag: null, // 标签
        sortField: null, // 排序字段，可选值范围[praiseCount,createTime]
        sortMethod: 'desc'// 排序方法，可选值范围[asc,desc],默认为desc
      }
      Object.assign(param, initial)
    }

    return {
      param,
      tagActiveIndex,
      sortActiveIndex,
      goods,
      goodInfo,
      pageTotal,
      list,
      toSpecs,
      handleSelectedTag,
      handSort,
      handleChangePage
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

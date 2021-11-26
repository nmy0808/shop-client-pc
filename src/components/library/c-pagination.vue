<template>
  <div class='c-pagination'>
    <a href='javascript:;' @click='handleChangePage(currentPage-1)' :class='{disabled: currentPage === 1}'>上一页</a>
    <span v-if='calcPages[0]>1'>...</span>
    <a v-for='item in calcPages' @click='handleChangePage(item)' :key='item' href='javascript:;'
       :class='{active:item === currentPage}'>{{ item }}</a>
    <span v-if='calcPages[calcPages.length-1]<limit'>...</span>
    <a @click='handleChangePage(currentPage+1)' :class='{disabled: currentPage === limit}' href='javascript:;'>下一页</a>
  </div>
</template>
<script>
import { computed } from 'vue'

export default {
  name: 'CPagination',
  props: {
    currentPage: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10
    },
    total: {
      type: Number,
      default: 1
    },
    // 总共显示多少页面
    pagerCount: {
      type: Number,
      default: 7
    }
  },
  emits: ['currentChange'],
  setup(props, { emit }) {
    // 页码总页数
    const limit = computed(() => Math.ceil(props.total / props.pageSize))
    const calcPages = computed(() => {
      const result = []
      const { currentPage, pageSize, total, pagerCount } = props
      let start = currentPage - Math.floor(pagerCount / 2)
      if (start < 1) {
        start = 1
      }
      let end = start + pagerCount - 1
      if (end > limit.value) {
        end = limit.value
      }
      for (let i = start; i <= end; i++) {
        result.push(i)
      }
      return result
    })
    const handleChangePage = (page) => {
      if (page < 1) return
      if (page > limit.value) return
      emit('currentChange', page)
    }
    return {
      limit,
      calcPages,
      handleChangePage
    }
  }
}
</script>
<style scoped lang='less'>
.c-pagination {
  display: flex;
  justify-content: center;
  padding: 30px;

  > a {
    display: inline-block;
    padding: 5px 10px;
    border: 1px solid #e4e4e4;
    border-radius: 4px;
    margin-right: 10px;

    &:hover {
      color: @mainColor;
    }

    &.active {
      background: @mainColor;
      color: #fff;
      border-color: @mainColor;
    }

    &.disabled {
      cursor: not-allowed;
      opacity: 0.4;

      &:hover {
        color: #333
      }
    }
  }

  > span {
    margin-right: 10px;
  }
}
</style>

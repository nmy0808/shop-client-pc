<template>
  <div class='goods-relevant'>
    <div class='header'>
      <i class='icon' />
      <span class='title'>同类商品推荐</span>
    </div>
    <!-- 此处使用改造后的c-carousel.vue -->
    <c-carousel :list='list' type='multiple' :auto='false'/>
  </div>
</template>

<script>
import { getGoodRelevantWithLikeApi } from '@/api'
import { ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'

export default {
  // 同类推荐，猜你喜欢
  name: 'GoodsRelevant',
  components: {},
  setup() {
    const route = useRoute()
    const list = ref([])
    watchEffect(async () => {
      list.value = []
      const id = route.params.id
      const name = route.name
      if (!id || id === 'undefined' || name !== 'product') return
      const data = await getGoodRelevantWithLikeApi({ id, limit: 8 })
      const num = 4
      const pageNum = Math.ceil(data.length / num)
      for (let i = 0; i < pageNum; i++) {
        const arr = data.slice(i * num, (i + 1) * num)
        list.value.push(arr)
      }
    })
    return {
      list
    }
  }
}
</script>

<style scoped lang='less'>
.goods-relevant {
  background: #fff;
  min-height: 460px;
  margin-top: 20px;

  .header {
    height: 80px;
    line-height: 80px;
    padding: 0 20px;

    .title {
      font-size: 20px;
      padding-left: 10px;
    }

    .icon {
      width: 16px;
      height: 16px;
      display: inline-block;
      border-top: 4px solid @mainColor;
      border-right: 4px solid @mainColor;
      box-sizing: border-box;
      position: relative;
      transform: rotate(45deg);

      &::before {
        content: "";
        width: 10px;
        height: 10px;
        position: absolute;
        left: 0;
        top: 2px;
        background: lighten(@mainColor, 40%);
      }
    }
  }
}
:deep(.c-carousel) {
  height: 380px;
  a.carousel-btn.prev, div.carousel-indicator{
    margin-left: 0;
  }
  .carousel {
    &-indicator {
      bottom: 30px;
      span {
        &.active {
          background: @mainColor;
        }
      }
    }
    &-btn {
      top: 110px;
      opacity: 1;
      background: rgba(0,0,0,0);
      color: #ddd;
      i {
        font-size: 30px;
      }
    }
  }
}

</style>

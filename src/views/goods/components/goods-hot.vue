<template>
  <div class='goods-hot'>
    <h3>{{ title }}</h3>
    <div v-if='list.length'>
      <GoodsItem v-for='item in list' :key='item.id' :data='item' />
      <!--      <div v-for='item in list' :key='item.id' :goods='item' >-->
      <!--        {{ item }}-->
      <!--      </div>-->
    </div>
  </div>
</template>
<script>
import { computed, ref, watchEffect } from 'vue'
import GoodsItem from '@/views/category/components/goods-item'
import { getGoodHotApi } from '@/api'
import { useRoute } from 'vue-router'

export default {
  name: 'GoodsHot',
  // eslint-disable-next-line vue/no-unused-components
  components: { GoodsItem },
  props: {
    type: {
      type: Number,
      default: 1
    }
  },
  setup(props) {
    const titleObj = { 1: '24小时热销榜', 2: '周热销榜', 3: '总热销榜' }
    const title = computed(() => {
      return titleObj[props.type]
    })
    const route = useRoute()
    const list = ref([])
    watchEffect(async () => {
      list.value = []
      const id = route.params.id
      const name = route.name
      if (!id || id === 'undefined' || name !== 'product') return
      list.value = await getGoodHotApi({ type: props.type, limit: 3 })
    })
    return { title, list }
  }
}
</script>
<style scoped lang='less'>
.goods-hot {
  h3 {
    height: 70px;
    background: @helpColor;
    color: #fff;
    font-size: 18px;
    line-height: 70px;
    padding-left: 25px;
    margin-bottom: 10px;
    font-weight: normal;
  }

  :deep(.goods-item) {
    background: #fff;
    width: 100%;
    margin-bottom: 10px;

    img {
      width: 200px;
      height: 200px;
    }

    p {
      margin: 0 10px;
    }

    &:hover {
      transform: none;
      box-shadow: none;
    }
  }
}
</style>

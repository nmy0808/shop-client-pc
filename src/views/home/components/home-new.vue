<template>
  <div class="home-new">
    <HomePanel title="新鲜好物" sub-title="新鲜出炉 品质靠谱">
      <template #right>
        <c-more path="/"/>
      </template>
      <!-- 面板内容 -->
      <ul class="goods-list" v-if="list.length>0">
        <li v-for="item in list" :key="item.id">
          <RouterLink :to='{name:"product", params: {id: item.id}}'>
            <img v-lazy="item.picture" alt="">
            <p class="name ellipsis">{{ item.name }}</p>
            <p class="price">&yen;{{ item.price }}</p>
          </RouterLink>
        </li>
      </ul>
      <ul class="goods-list" v-else>
        <c-skeleton v-for="item in 4" :key="item" width="306px" height="306px" animate-type="shan"></c-skeleton>
      </ul>
    </HomePanel>
  </div>
</template>
<script>
import { onMounted, ref } from 'vue'
import HomePanel from './home-panel'
import { getNewApi } from '@/api'
import CSkeleton from '@/components/library/c-skeleton'

export default {
  name: 'HomeNew',
  components: {
    CSkeleton,
    HomePanel
  },
  setup () {
    const list = ref([])
    onMounted(async () => {
      list.value = await getNewApi()
    })
    return {
      list
    }
  }
}
</script>
<style scoped lang="less">
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;

  li {
    width: 306px;
    height: 406px;
    background: #f0f9f4;
    .hoverShadow();

    img {
      width: 306px;
      height: 306px;
    }

    p {
      font-size: 22px;
      padding: 12px 30px 0 30px;
      text-align: center;
    }

    .price {
      color: @priceColor;
    }
  }
}
</style>

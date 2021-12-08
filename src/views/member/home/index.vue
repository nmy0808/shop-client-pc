<template>
  <div class='member-home'>
    <member-home-overview></member-home-overview>
    <member-home-panel title='我的收藏'>
      <GoodsItem v-for='item in collectList' :key='item.id' :data='item' />
    </member-home-panel>
    <member-home-panel title='我的足迹'>
      <GoodsItem v-for='item in historyList' :key='item.id' :data='item' />
    </member-home-panel>
    <GoodsRelevant />
  </div>
</template>
<script>
import MemberHomeOverview from '@/views/member/home/components/home-overview'
import MemberHomePanel from '@/views/member/home/components/home-panel'
import GoodsRelevant from '@/views/goods/components/goods-relevant'
import GoodsItem from '@/views/category/components/goods-item'
import { getBrowseHistoryApi, getCollectApi } from '@/api/member'
import { ref } from 'vue'

export default {
  name: 'MemberHome',
  components: { GoodsItem, GoodsRelevant, MemberHomePanel, MemberHomeOverview },
  setup() {
    const collectList = ref(null)
    const historyList = ref(null)
    getCollectList()
    getBrowseHistory()

    //  获取收藏列表
    async function getCollectList() {
      const { items } = await getCollectApi({ page: 1, pageSize: 4, collectType: 1 })
      collectList.value = items
    }

    // 获取我的足迹
    async function getBrowseHistory() {
      const { items } = await getBrowseHistoryApi()
      historyList.value = items.map(it => it.spu).slice(0, 4)
    }

    return {
      collectList,
      historyList
    }
  }
}
</script>
<style scoped lang='less'>
.member-home {

}
</style>

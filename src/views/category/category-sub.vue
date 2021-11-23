<template>
  <div class='container'>
    <sub-bread
      :sub='{id:categoryData.id, name: categoryData.name}'
      :parent='{name:categoryData.parentName, id:categoryData.parentId}'
    ></sub-bread>
    <!-- 筛选区 -->
    <sub-filter
      @filter-change='handleFilterChange'
      :brands='categoryData.brands'
      :saleProperties='categoryData.saleProperties' />
    <!-- 结果区域 -->
    <div class='goods-list'>
      <!-- 排序 -->
      <SubSort @sort-change='handleFilterChange' />
      <!-- 列表 -->
      <ul>
        <li v-for='item in goodList' :key='item.id'>
          <GoodsItem :data='item' />
        </li>
      </ul>
      <c-infinite-loading v-bind='loadState' @infinite='handleInfinite' />
    </div>
  </div>
</template>

<script>
import { computed, onUnmounted, reactive, ref, watch, watchEffect } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { getGoodsByFilterApi, getSubCategoryApi } from '@/api'
import SubBread from '@/views/category/components/sub-bread'
import SubFilter from '@/views/category/components/sub-filter'
import GoodsItem from '@/views/category/components/goods-item'
import SubSort from '@/views/category/components/sub-sort'
import CInfiniteLoading from '@/components/library/c-infinite-loading'

export default {
  name: 'categorySub',
  components: { CInfiniteLoading, SubSort, GoodsItem, SubFilter, SubBread },
  setup() {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    const id = computed(() => route.params.id)
    const categoryData = ref({})
    const goodList = ref([])
    // 加载状态
    const loadState = reactive({
      loading: false,
      finished: false
    })
    // 查询条件
    const searchParams = ref({
      categoryId: id.value,
      page: 1,
      pageSize: 20
    })
    // api 获取二级类目-筛选条件
    const getSubCategoryData = async () => {
      const data = await getSubCategoryApi(id.value)
      categoryData.value = data
    }
    // api 获取商品列表
    const getGoodsData = async (searchParams) => {
      if (loadState.finished) return
      loadState.loading = true
      const { items, page, pages } = await getGoodsByFilterApi(searchParams)
      goodList.value.push(...items)
      loadState.loading = false
      searchParams.page++
      if (page > pages) {
        loadState.finished = true
      }
    }
    // 筛选条件改变事件
    const handleFilterChange = (filterSearch) => {
      Object.assign(searchParams, filterSearch)
    }
    //
    const handleInfinite = () => {
      if (loadState.loading) return
      getGoodsData(searchParams.value)
    }
    //
    watchEffect(() => {
      if (route.name !== 'categorySub') return
      if (!id.value || id.value === 'undefined') return
      goodList.value = []
      searchParams.value.page = 1
      loadState.finished = false
      searchParams.value = {
        categoryId: id.value,
        page: 1,
        pageSize: 20
      }
      getSubCategoryData()
    })
    watch(searchParams, () => {
      if (route.name !== 'categorySub') return
      if (!id.value || id.value === 'undefined') return
      getGoodsData(searchParams.value)
    })
    return {
      id,
      loadState,
      categoryData,
      handleFilterChange,
      goodList,
      handleInfinite,
      searchParams
    }
  }
}
</script>

<style scoped lang='less'>
.goods-list {
  background: #fff;
  padding: 0 25px;
  margin-top: 25px;

  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 5px;

    li {
      margin-right: 20px;
      margin-bottom: 20px;

      &:nth-child(5n) {
        margin-right: 0;
      }
    }
  }
}
</style>

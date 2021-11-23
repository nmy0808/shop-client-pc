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
      <SubSort />
      <!-- 列表 -->
      <ul>
        <li v-for='i in 20' :key='i'>
          <GoodsItem :goods='{}' />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { computed, onUnmounted, ref, watchEffect } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { getSubCategoryApi } from '@/api'
import SubBread from '@/views/category/components/sub-bread'
import SubFilter from '@/views/category/components/sub-filter'
import GoodsItem from '@/views/category/components/goods-item'
import SubSort from '@/views/category/components/sub-sort'

export default {
  name: 'categorySub',
  components: { SubSort, GoodsItem, SubFilter, SubBread },
  setup() {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    const id = computed(() => route.params.id)
    const categoryData = ref({})
    const searchParams = {}
    // api 获取二级类目-筛选条件
    const getSubCategoryData = async () => {
      const data = await getSubCategoryApi(id.value)
      categoryData.value = data
    }
    // 筛选条件改变事件
    const handleFilterChange = (filterSearch) => {
      Object.assign(searchParams, filterSearch)
    }
    // 排序改变事件
    //
    const stop = watchEffect(() => {
      if (route.name !== 'categorySub') return
      if (!id.value || id.value === 'undefined') return
      getSubCategoryData()
    })
    onUnmounted(() => {
      stop()
    })
    return { id, categoryData, handleFilterChange }
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

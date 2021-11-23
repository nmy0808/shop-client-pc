<template>
  <div class='container'>
    <sub-bread
      :sub='{id:categoryData.id, name: categoryData.name}'
      :parent='{name:categoryData.parentName, id:categoryData.parentId}'
    ></sub-bread>
  </div>
</template>

<script>
import { computed, onUnmounted, ref, watchEffect } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { getSubCategoryApi } from '@/api'
import SubBread from '@/views/category/components/sub-bread'

export default {
  name: 'categorySub',
  components: { SubBread },
  setup() {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    const id = computed(() => route.params.id)
    const categoryData = ref({})
    // api 获取二级类目-筛选条件
    const getSubCategoryData = async () => {
      const data = await getSubCategoryApi(id.value)
      categoryData.value = data
      console.log(data)
    }
    //
    const stop = watchEffect(() => {
      if (route.name !== 'categorySub') return
      if (!id.value || id.value === 'undefined') return
      getSubCategoryData()
    })
    onUnmounted(() => {
      stop()
    })
    return { id, categoryData }
  }
}
</script>

<style scoped>

</style>

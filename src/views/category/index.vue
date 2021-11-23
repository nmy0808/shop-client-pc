<template>
  <div class='category-page container'>
    <c-bread>
      <c-bread-item :to='{name: "home"}'>首页</c-bread-item>
      <transition name='fade-right' mode='out-in'>
        <c-bread-item :key='categoryName'>{{ categoryName }}</c-bread-item>
      </transition>
    </c-bread>
    <div class='category-banner'>
      <home-banner></home-banner>
    </div>
  </div>
</template>

<script>
import { onUnmounted, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import CBread from '@/components/library/c-bread'
import CBreadItem from '@/components/library/c-bread-item'
import { useStore } from 'vuex'
import HomeBanner from '@/views/home/components/home-banner'

export default {
  name: 'category-page',
  // eslint-disable-next-line vue/no-unused-components
  components: { HomeBanner, CBreadItem, CBread },
  setup() {
    const route = useRoute()
    const store = useStore()
    const categoryName = ref('')
    const stop = watchEffect(() => {
      if (route.name !== 'category') return
      const { id } = route.params
      const routeData = store.state.category.list.filter(item => item.id === id)[0]
      routeData && (categoryName.value = routeData.name)
    })
    onUnmounted(() => {
      stop()
    })
    return { categoryName }
  }
}
</script>

<style scoped>
.category-banner {
  position: relative;
  height: 500px;
}
</style>

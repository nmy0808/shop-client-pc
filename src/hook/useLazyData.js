import { useIntersectionObserver } from '@vueuse/core'
import { ref } from 'vue'

/**
 * 组件数据懒加载
 * @param {function} fetchFn 异步数据请求函数
 * @returns {{data: [], target: ref<null>}}
 */
export default (fetchFn) => {
  const target = ref(null)
  const data = ref([])
  const { stop } = useIntersectionObserver(
    target, async ([{ isIntersecting }], observerElement) => {
      if (isIntersecting) {
        stop()
        data.value = await fetchFn()
      }
    }, {
      threshold: 0 // 阈值
    }
  )
  return {
    target,
    data
  }
}

// 倒计时
import { useIntervalFn } from '@vueuse/core'
import { unix } from 'dayjs'
import { onUnmounted, ref } from 'vue'

function fn() {
  const countdownText = ref('')
  let countdown = null
  const { resume, pause } = useIntervalFn(() => {
    countdown--
    countdownText.value = unix(countdown).format('mm分ss秒')
    if (countdown <= 0) {
      pause()
    }
  }, 1000, { immediate: false })
  // 参数: 剩余秒
  const start = (time) => {
    countdown = time
    countdownText.value = countdown < 0 ? '已失效' : unix(countdown).format('mm分ss秒')
    countdown > 0 && resume()
  }
  onUnmounted(() => {
    pause()
  })
  return {
    start,
    pause,
    countdownText
  }
}

export default fn

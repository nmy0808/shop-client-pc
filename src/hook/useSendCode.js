import { useIntervalFn } from '@vueuse/core'
import { ref } from 'vue'

export default (startFn) => {
  const codeNum = ref(0)
  const { pause, resume } = useIntervalFn(() => {
    codeNum.value--
    if (codeNum.value <= 0) {
      codeNum.value = 0
      pause()
    }
  }, 1000, { immediate: false })
  /**
   * 方法: 发送信息
   * @param startFn {function} 开始发送信息的回调
   */
  const handleSendCode = () => {
    if (codeNum.value > 0) return
    // 触发回调
    if (startFn && typeof startFn === 'function') {
      startFn()
    }
    codeNum.value = 60
    resume()
  }
  return {
    codeNum,
    pause,
    resume,
    handleSendCode
  }
}

import { useIntervalFn } from '@vueuse/core'
import { ref } from 'vue'
import { sendLoginCodeApi } from '@/api'

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
   * @param mobile {string} 手机号
   */
  const handleSendCode = async (mobile) => {
    if (codeNum.value > 0) return
    // 触发回调
    if (startFn && typeof startFn === 'function') {
      startFn()
    }
    await sendLoginCodeApi({ mobile })
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

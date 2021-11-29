import { useIntervalFn } from '@vueuse/core'
import { ref } from 'vue'
import { sendBindCodeApi, sendLoginCodeApi, sendRegisterWithBindCodeApi } from '@/api'
import message from '@/components/library/message'

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
   * @param type {string}  login|bind  发送code的类型
   */
  const handleSendCode = async (mobile, type) => {
    if (codeNum.value > 0) return
    // 触发回调
    if (startFn && typeof startFn === 'function') {
      startFn()
    }
    if (type === 'login' || !type) {
      await sendLoginCodeApi({ mobile })
    }
    if (type === 'bind') {
      await sendBindCodeApi({ mobile })
    }
    if (type === 'reg') {
      await sendRegisterWithBindCodeApi({ mobile })
    }
    message.success({ text: '验证码发送成功' })
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

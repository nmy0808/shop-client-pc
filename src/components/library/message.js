import CMessage from '@/components/library/c-message.vue'
import { createApp } from 'vue'

/**
 * @param options {Object}  {text:消息 type:warn 警告  error 错误  success 成功}
 */
const fn = (options) => {
  let instance = null
  const div = document.createElement('div')
  options.closed = () => {
    instance && document.body.removeChild(instance.$el)
  }
  instance = createApp(CMessage, options).mount(div)

  document.body.appendChild(instance.$el)
}
['warn', 'error', 'success'].forEach(type => {
  fn[type] = (options) => {
    fn({ type, ...options })
  }
})
export default fn

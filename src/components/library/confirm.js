import confirm from './c-confirm'
import { createApp } from 'vue'

/**
 * 确认窗口
 * @param options {Object} title,text
 * @returns {Promise<unknown>}
 */
const fn = (options) => {
  let instance = null
  const div = document.createElement('div')
  return new Promise((resolve, reject) => {
    options.confirm = resolve
    options.cancel = () => {
      instance && document.body.removeChild(instance.$el)
      // eslint-disable-next-line prefer-promise-reject-errors
      reject()
    }
    instance = createApp(confirm, options).mount(div)
    document.body.appendChild(instance.$el)
  })
}

export default fn

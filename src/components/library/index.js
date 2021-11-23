// 指令
import lazy from './lazy.directive'

const importFn = require.context('./', false, /\.vue$/)
const components = importFn.keys().map(path => importFn(path).default)

const directives = { lazy }

export default {
  install(app) {
    // 注册组件
    components.forEach(it => {
      app.component(it.name, it)
    })
    // 注册指令
    for (const key in directives) {
      app.directive(key, directives[key])
    }
    //
  }
}

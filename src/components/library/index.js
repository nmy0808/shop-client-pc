// 组件
import CSkeleton from './c-skeleton'
import CCarousel from './c-carousel'
import CMore from './c-more'
// 指令
import lazy from './lazy.directive'

const components = [CSkeleton, CCarousel, CMore]
const directives = { lazy }

export default {
  install (app) {
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

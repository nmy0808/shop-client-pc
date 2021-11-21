import CSkeleton from './c-skeleton'
import CCarousel from './c-carousel'

const components = [CSkeleton, CCarousel]

export default {
  install (app) {
    components.forEach(it => {
      app.component(it.name, it)
    })
  }
}

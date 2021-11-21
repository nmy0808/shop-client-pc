import CSkeleton from './c-skeleton'
import CCarousel from './c-carousel'
import CMore from './c-more'

const components = [CSkeleton, CCarousel, CMore]

export default {
  install (app) {
    components.forEach(it => {
      app.component(it.name, it)
    })
  }
}

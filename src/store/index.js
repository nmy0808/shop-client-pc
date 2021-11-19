import { createStore } from 'vuex'
import cart from '@/store/modules/cart'
import user from '@/store/modules/user'
import category from '@/store/modules/category'

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    cart,
    user,
    category
  }
})

import { createStore } from 'vuex'
import cart from '@/store/modules/cart'
import user from '@/store/modules/user'
import category from '@/store/modules/category'
import createPersistedState from 'vuex-persistedstate'

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    cart,
    user,
    category
  },
  plugins: [createPersistedState({
    key: 'shop-client-pc-store',
    paths: ['user', 'cart']
  })]

})

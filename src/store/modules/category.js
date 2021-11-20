import { topCategory } from '@/api/constants'
import { getCategoryListApi } from '@/api'

export default {
  namespaced: true,
  state () {
    return {
      list: topCategory.map(it => {
        return { name: it }
      })
    }
  },
  mutations: {
    setCategory (state, payload) {
      state.list = payload
    },
    setNavState (state, { target, show }) {
      const item = state.list.find(it => {
        return it.id === target.id
      })
      item.open = show
    }
  },
  actions: {
    async getCategory ({ commit }) {
      const list = await getCategoryListApi()
      list.forEach(it => {
        it.open = false
      })
      commit('setCategory', list)
    }
  }
}

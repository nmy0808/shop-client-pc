import { getNewCartGoods } from '@/api'

export default {
  namespaced: true,
  state() {
    return {
      // 用户信息
      // 本地: id skuId name picture price nowPrice count attrsTest selected stock isEffective
      // 线上: 比上面多 isCollect:收藏 discount:有效
      list: []
    }
  },
  getters: {
    // 有效商品列表
    validList(state) {
      return state.list.filter(it => it.stock > 0 && it.isEffective)
    },
    // 有效商品总数
    validTotal(state, getters) {
      return getters.validList.reduce((p, c) => p + c.count, 0)
    },
    // 邮箱商品总价
    validAmount(state, getters) {
      const num = getters.validList.reduce((p, c) => p + c.count * Math.round(c.nowPrice * 100), 0) / 100
      return num.toFixed(2)
    }
  },
  mutations: {
    // 增加商品
    insertCart(state, payload) {
      const target = state.list.find(it => it.skuId === payload.skuId)
      if (target) {
        target.count += payload.count
      } else {
        state.list.unshift(payload)
      }
    },
    // 设置购物车
    setCart(state, list) {
      state.list = list
    },
    // 修改购物车内的某一个商品
    updateCart(state, goods) {
      // goods中字段有可能不完成, goods不为空的信息才会去修改, false值除外
      const targetGoods = state.list.find(it => it.skuId === goods.skuId)
      for (const key in goods) {
        const value = goods[key]
        if (value !== null && value !== undefined && value !== '') {
          targetGoods[key] = value
        }
      }
    },
    // 删除购物车里指定商品
    deleteCart(state, goods) {
      const index = state.list.findIndex(it => it.skuId === goods.skuId)
      if (index > -1) {
        state.list.splice(index, 1)
      }
    }
  },
  actions: {
    insertCart(ctx, payload) {
      return new Promise((resolve, reject) => {
        // 如果已经登录
        if (ctx.rootState.user.token) {
        } else {
          // 如果离线
          ctx.commit('insertCart', payload)
          resolve()
        }
      })
    },
    // 更新当前购物车最新状态
    fetchNewCart(ctx) {
      const promiseArr = []
      const listCopy = JSON.parse(JSON.stringify(ctx.state.list))
      listCopy.forEach(it => {
        promiseArr.push(getNewCartGoods({ id: it.skuId }))
      })
      Promise.all(promiseArr).then(res => {
        // 返回的json里需要补充一个skuId字段
        res.forEach((item, index) => ctx.commit('updateCart', { ...item, skuId: listCopy[index].skuId }))
      })
    },
    // 删除指定商品
    deleteCart(ctx, goods) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.token) {

        } else {
          ctx.commit('deleteCart', goods)
          resolve()
        }
      })
    }
  }
}

import { getNewCartGoods } from '@/api'
import { deleteCartApi, getCartListApi, insertCartApi, mergeCartApi, updateCartApi } from '@/api/cart'
// 是否第一次合并购物车
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
    invalidList(state) {
      return state.list.filter(it => it.stock === 0 || !it.isEffective)
    },
    // 有效商品总数
    validTotal(state, getters) {
      return getters.validList.reduce((p, c) => p + c.count, 0)
    },
    // 有效商品总价
    validAmount(state, getters) {
      const num = getters.validList.reduce((p, c) => p + c.count * Math.round(c.nowPrice * 100), 0) / 100
      return num.toFixed(2)
    },
    // 已选中商品列表
    selectedList(state) {
      return state.list.filter(it => it.selected)
    },
    // 已选中商品总价
    selectedAmount(state, getters) {
      const num = getters.selectedList.reduce((p, c) => p + Math.round(c.nowPrice * c.count * 100), 0) / 100
      return num.toFixed(2)
    },
    // 已选中商品总数
    selectedTotal(state, getters) {
      return getters.selectedList.reduce((p, c) => p + c.count, 0)
    },
    isSelectAll(state, getters) {
      return getters.selectedTotal === getters.validTotal
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
        if (ctx.rootState.user.profile.token) {
          const params = {}
          params.skuId = payload.skuId
          params.count = payload.count
          // 添加购物车
          insertCartApi(params).then(res => {
            // 更新购物车列表
            ctx.dispatch('fetchNewCart').then(res => resolve)
          })
        } else {
          // 如果离线
          ctx.commit('insertCart', payload)
          resolve()
        }
      })
    },
    // 更新当前购物车最新状态
    fetchNewCart(ctx) {
      return new Promise((resolve, reject) => {
        // 如果已经登录
        if (ctx.rootState.user.profile.token) {
          getCartListApi().then(res => {
            ctx.commit('setCart', [])
            res.forEach(item => {
              item.attrsTest = item.attrsText
            })
            ctx.commit('setCart', res)
            resolve()
          })
        } else {
          // 获取当前购物车
          const promiseArr = []
          const listCopy = JSON.parse(JSON.stringify(ctx.state.list))
          listCopy.forEach(it => {
            promiseArr.push(getNewCartGoods({ id: it.skuId }))
          })
          Promise.all(promiseArr).then(res => {
            // 返回的json里需要补充一个skuId字段
            res.forEach((item, index) => ctx.commit('updateCart', { ...item, skuId: listCopy[index].skuId }))
          })
          resolve()
        }
      })
    },
    // 删除指定商品
    deleteCart(ctx, goods) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          deleteCartApi([goods.skuId]).then(res => {
            // 更新购物车列表
            ctx.dispatch('fetchNewCart').then(res => resolve)
          })
        } else {
          ctx.commit('deleteCart', goods)
          resolve()
        }
      })
    },
    // 删除所有有效选中/无效商品
    // type = 'valid' | 'invalid'
    deleteCartAll(ctx, type) {
      const list = ctx.getters[type === 'valid' ? 'selectedList' : 'invalidList']
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // 获取所有skuId, 然后删除
          const skuIds = list.map(item => item.skuId)
          deleteCartApi(skuIds).then(res => {
            // 更新购物车列表
            ctx.dispatch('fetchNewCart').then(res => resolve)
          })
        } else {
          list.forEach(item => {
            ctx.commit('deleteCart', item)
          })
          resolve()
        }
      })
    },
    // 改变指定商品状态
    // goods必须要有skuId字段
    updateCart(ctx, goods) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          updateCartApi(goods).then(res => {
            // 更新购物车列表
            ctx.dispatch('fetchNewCart').then(res => resolve)
          })
        } else {
          ctx.commit('updateCart', goods)
          resolve()
        }
      })
    },
    // 改变全部有效的商品状态
    updateCartAll(ctx, flag) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // ids
          const skuIds = ctx.getters.validList.map(item => item.skuId)
          const promiseArr = skuIds.map(it => updateCartApi({ skuId: it, selected: flag }))
          Promise.all(promiseArr).then(res => {
            // 更新购物车列表
            ctx.dispatch('fetchNewCart').then(res => resolve)
          })
        } else {
          ctx.getters.validList.forEach(item => {
            item.selected = flag
            ctx.commit('updateCart', item)
          })
          resolve()
        }
      })
    },
    // 修改sku
    updateCartSku(ctx, { oldSkuId, newSku }) {
      return new Promise((resolve, reject) => {
        const list = ctx.state.list
        const index = list.findIndex(it => it.skuId === oldSkuId)
        const oldGoods = list[index]
        const { price: nowPrice, inventory, skuId, specsText: attrsTest } = newSku
        const newGoods = { ...oldGoods, nowPrice, inventory, skuId, attrsTest }
        if (ctx.rootState.user.profile.token) {
          deleteCartApi([oldGoods.skuId]).then(res => {
            insertCartApi({ skuId: newGoods.skuId, count: newGoods.count }).then(res => {
              // 更新购物车列表
              ctx.dispatch('fetchNewCart').then(res => resolve)
            })
          })
        } else {
          ctx.commit('deleteCart', oldGoods)
          ctx.commit('insertCart', newGoods)
          resolve()
        }
      })
    },
    // 合并购物车
    async mergeCart(ctx) {
      const localList = ctx.state.list
      // 合并本地远程购物车
      await mergeCartApi(localList)
    }
  }
}

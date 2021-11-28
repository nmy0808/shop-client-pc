export default {
  namespaced: true,
  state() {
    return {
      // 用户信息
      profile: {
        id: '',
        avatar: '',
        nickname: '',
        account: '',
        mobile: '',
        token: ''
      },
      // 记录url跳入登录页之前的页面路径
      redirectUrl: '/'
    }
  },
  mutations: {
    setUser(state, payload) {
      state.profile = payload
    },
    setRedirect(state, payload) {
      state.redirectUrl = payload
    }
  }
}

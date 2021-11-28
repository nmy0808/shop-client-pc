import store from '@/store'
import router from '@/router'
// 返回登录之前的页面
export default () => {
  const redirectUrl = store.state.user.redirectUrl
  router.push(redirectUrl)
}

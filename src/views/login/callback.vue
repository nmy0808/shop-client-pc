<template>
  <LoginHeader>联合登录</LoginHeader>
  <section class='container' v-if='!isBind'>
    <div class='unbind'>
      <div class='loading'></div>
    </div>
  </section>
  <section class='container' v-else>
    <nav class='tab'>
      <a @click='hasAccount=true' :class='{active:hasAccount}' href='javascript:;'>
        <i class='iconfont icon-bind' />
        <span>已有小兔鲜账号，请绑定手机</span>
      </a>
      <a @click='hasAccount=false' :class='{active:!hasAccount}' href='javascript:;'>
        <i class='iconfont icon-edit' />
        <span>没有小兔鲜账号，请完善资料</span>
      </a>
    </nav>
    <div class='tab-content' v-if='hasAccount'>
      <CallbackBind :nickname='nickname' :avatar='avatar' />
    </div>
    <div class='tab-content' v-else>
      <CallbackPatch />
    </div>
  </section>
  <LoginFooter />
</template>

<script>
import { provide, ref } from 'vue'
import LoginHeader from './components/login-header'
import LoginFooter from './components/login-footer'
import CallbackBind from './components/callback-bind'
import CallbackPatch from './components/callback-patch'
import QC from 'qc'

export default {
  name: 'PageCallback',
  components: { LoginHeader, LoginFooter, CallbackBind, CallbackPatch },
  setup() {
    const hasAccount = ref(true)
    const nickname = ref(null)
    const avatar = ref(null)
    // 判断是否绑定了qq
    const isBind = ref(false)
    // 是否qq验证通过
    const flag = QC.Login.check()
    // qq的openid
    const unionId = ref('')
    // qq的用户资料信息
    const userInfo = ref(null)
    provide('userInfo', userInfo)
    if (flag) {
      QC.Login.getMe(openId => {
        // 获取openid
        unionId.value = openId
        // - 如果账号已绑定完整, 直接跳转转发url或者首页
        if (isBind.value) {
          console.log('')
        } else {
          // 获取用户头像等信息
          QC.api('https://graph.qq.com/user/get_user_info').success(res => {
            userInfo.value = res.data
          })
          // - 如果账号没有绑定, 显示绑定页面
          isBind.value = true
          console.log(12)
        }
      })
    }
    return { hasAccount, nickname, avatar, isBind, userInfo }
  }
}
</script>

<style scoped lang='less'>
.container {
  padding: 25px 0;
}

.tab {
  background: #fff;
  height: 80px;
  padding-top: 40px;
  font-size: 18px;
  text-align: center;

  a {
    color: #666;
    display: inline-block;
    width: 350px;
    line-height: 40px;
    border-bottom: 2px solid #e4e4e4;

    i {
      font-size: 22px;
      vertical-align: middle;
    }

    span {
      vertical-align: middle;
      margin-left: 4px;
    }

    &.active {
      color: @mainColor;
      border-color: @mainColor;
    }
  }
}

.tab-content {
  min-height: 600px;
  background: #fff;
}
</style>

<template>
  <LoginHeader>联合登录</LoginHeader>
  <section class='container' v-if='isBind'>
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
import { ref } from 'vue'
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
    const flag = QC.Login.check()
    if (flag) {
      QC.Login.getMe(openId => {
        // 获取openid
        console.log(openId, '????????')
      })
    }
    return { hasAccount, nickname, avatar, isBind }
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

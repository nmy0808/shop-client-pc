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
import { onMounted, provide, ref } from 'vue'
import LoginHeader from './components/login-header'
import LoginFooter from './components/login-footer'
import CallbackBind from './components/callback-bind'
import CallbackPatch from './components/callback-patch'
import QC from 'qc'
import { getLoginInfoByUnionIdApi } from '@/api'
import useLoginRedirect from '@/hook/useLoginRedirect'

export default {
  name: 'PageCallback',
  components: { LoginHeader, LoginFooter, CallbackBind, CallbackPatch },
  setup() {
    const hasAccount = ref(true)
    const nickname = ref(null)
    const avatar = ref(null)
    // 判断是否绑定了qq
    const isBind = ref(false)

    // qq的openid
    const unionId = ref('')
    // qq的用户资料信息
    const userInfo = ref(null)
    provide('userInfo', userInfo)
    provide('unionId', unionId)

    onMounted(async () => {
      // 获取id
      unionId.value = await getUnionId()
      // 访问后台该id所绑资料是否完善
      const flag = await checkAccount()
      if (flag) {
        // - 如果账号资料绑定完善, 直接跳转转发url或者首页
        useLoginRedirect()
      } else {
        // - 如果不完善跳显示绑定页, 完善资料
        showBindForm()
      }
    })

    /**
     * 获取qq的unionId
     * @returns {Promise<unknown>}
     */
    function getUnionId() {
      // 检查是否qq验证通过
      const flag = QC.Login.check()
      return new Promise((resolve, reject) => {
        if (flag) {
          QC.Login.getMe(openId => {
            // 返回openid
            resolve(openId)
          })
        }
      })
    }

    // 检查unionId是否已经完善
    async function checkAccount() {
      const params = {}
      params.unionId = unionId.value
      params.source = 1
      try {
        await getLoginInfoByUnionIdApi(params)
        return Promise.resolve(true)
      } catch (e) {
        return Promise.resolve(false)
      }
    }

    /**
     * 获取用户头像, 并显示绑定表单
     */
    function showBindForm() {
      // 获取用户头像等信息
      QC.api('https://graph.qq.com/user/get_user_info').success(res => {
        userInfo.value = res.data
      })
      // 显示绑定表单
      isBind.value = true
    }

    return { hasAccount, nickname, avatar, isBind, userInfo }
  }
}
</script>

<style scoped lang='less'>
.container {
  padding: 25px 0;
  position: relative;
  height: 730px;
  .unbind {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    padding: 25px 0;
    z-index: 99;
    .loading {
      height: 100%;
      background: #fff url(../../assets/images/load.gif) no-repeat center / 100px 100px;
    }
  }
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

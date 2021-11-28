<template>
  <LoginHeader>欢迎登录</LoginHeader>
  <section className='login-section'>
    <div className='wrapper'>
      <nav>
        <a :class='{active:activeName==="account"}' @click='activeName="account"' href='javascript:;'>账户登录</a>
        <a :class='{active:activeName==="qrcode"}' @click='activeName="qrcode"' href='javascript:;'>扫码登录</a>
      </nav>
      <!-- 表单 -->
      <LoginForm v-if="activeName==='account'">表单</LoginForm>
      <!-- 二维码 -->
      <div v-if="activeName==='qrcode'" class='qrcode-box'>
        <img src='@/assets/images/qrcode.jpg' alt=''>
        <p>打开 <a href='javascript:;'>小兔鲜App</a> 扫码登录</p>
      </div>
    </div>
  </section>
  <LoginFooter />
</template>

<script>
import LoginHeader from './components/login-header'
import LoginFooter from './components/login-footer'
import LoginForm from './components/LoginForm'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

export default {
  name: 'Login',
  components: {
    LoginHeader,
    LoginFooter,
    LoginForm
  },
  setup() {
    const activeName = ref('account')
    const route = useRoute()
    const store = useStore()
    // 判断url上是否有需要重定向的页面, 存入vuex中
    const redirectUrl = route.query.redirect
    if (redirectUrl) {
      store.commit('user/setRedirect', redirectUrl)
    } else {
      store.commit('user/setRedirect', '/')
    }
    return {
      activeName
    }
  }
}
</script>

<style scoped lang='less'>
.login-section {
  background: url(../../assets/images/login-bg.png) no-repeat center / cover;
  height: 488px;
  position: relative;

  .wrapper {
    width: 380px;
    background: #fff;
    min-height: 400px;
    position: absolute;
    left: 50%;
    top: 54px;
    transform: translate3d(100px, 0, 0);
    box-shadow: 0 0 10px rgba(0, 0, 0, .15);

    nav {
      height: 55px;
      border-bottom: 1px solid #f5f5f5;
      display: flex;
      padding: 0 40px;
      text-align: right;
      align-items: center;

      a {
        flex: 1;
        line-height: 1;
        display: inline-block;
        font-size: 18px;
        position: relative;

        &:first-child {
          border-right: 1px solid #f5f5f5;
          text-align: left;
        }

        &.active {
          color: @mainColor;
          font-weight: bold;
        }
      }
    }
  }
}

// 二维码容器
.qrcode-box {
  text-align: center;
  padding-top: 40px;

  p {
    margin-top: 20px;

    a {
      color: @mainColor;
      font-size: 16px;
    }
  }
}
</style>

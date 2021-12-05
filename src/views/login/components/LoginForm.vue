<template>
  <div class='account-box'>
    <div class='toggle'>
      <a @click='onMsgLoginChange(false)' href='javascript:;' v-if='isMsgLogin'>
        <i class='iconfont icon-user'></i> 使用账号登录
      </a>
      <a @click='onMsgLoginChange(true)' href='javascript:;' v-else>
        <i class='iconfont icon-msg'></i> 使用短信登录
      </a>
    </div>
    <Form ref='formCom' class='form' v-slot='{errors}' autocomplete='off'>
      <template v-if='!isMsgLogin'>
        <div class='form-item'>
          <div class='input'>
            <i class='iconfont icon-user'></i>
            <Field :class='{error:errors.account}' v-model='form.account' name='account' type='text'
                   :rules='schema.account'
                   placeholder='请输入用户名' />
          </div>
          <div class='error' v-if='errors.account'>
            <i class='iconfont icon-warning' />
            {{ errors.account }}
          </div>
        </div>
        <div class='form-item'>
          <div class='input'>
            <i class='iconfont icon-lock'></i>
            <Field :class='{error:errors.password}' v-model='form.password' name='password' type='password'
                   :rules='schema.password'
                   placeholder='请输入密码' />
          </div>
          <div class='error' v-if='errors.password'>
            <i class='iconfont icon-warning' />
            {{ errors.password }}
          </div>
        </div>
      </template>
      <template v-else>
        <div class='form-item'>
          <div class='input'>
            <i class='iconfont icon-user'></i>
            <Field :class='{error:errors.mobile}' v-model='form.mobile' name='mobile' type='text'
                   :rules='schema.mobile'
                   placeholder='请输入手机号' />
          </div>
          <div class='error' v-if='errors.mobile'>
            <i class='iconfont icon-warning' />
            {{ errors.mobile }}
          </div>
        </div>
        <div class='form-item'>
          <div class='input'>
            <i class='iconfont icon-code'></i>
            <Field :class='{error:errors.code}' v-model='form.code' name='code' type='text'
                   :rules='schema.code'
                   placeholder='请输入验证码' />
            <span class='code' @click.stop='sendCode'>
              {{ codeNum === 0 ? '发送验证码' : `${codeNum}秒后发送` }}
            </span>
          </div>
          <div class='error' v-if='errors.code'>
            <i class='iconfont icon-warning' />
            {{ errors.code }}
          </div>
        </div>
      </template>

      <div class='form-item'>
        <div class='agree'>
          <Field name='isAgree' v-slot='{ field }'>
            <CCheckbox v-bind='field' v-model='form.isAgree'></CCheckbox>
          </Field>
          <span>我已同意</span>
          <a href='javascript:;'>《隐私条款》</a>
          <span>和</span>
          <a href='javascript:;'>《服务条款》</a>
        </div>
        <div class='error' v-if='errors.isAgree'>
          <i class='iconfont icon-warning' />
          {{ errors.isAgree }}
        </div>
      </div>
      <a @click='handleLogin()' href='javascript:;' class='btn'>登录</a>
    </Form>
    <div class='action'>
      <a
        href='https://graph.qq.com/oauth2.0/authorize?client_id=100556005&response_type=token&scope=all&redirect_uri=http%3A%2F%2Fwww.corho.com%3A8080%2F%23%2Flogin%2Fcallback'>
        <img src='https://qzonestyle.gtimg.cn/qzone/vas/opensns/res/img/Connect_logo_7.png' alt=''>
      </a>

      <div class='url'>
        <a href='javascript:;'>忘记密码</a>
        <a href='javascript:;'>免费注册</a>
      </div>
    </div>
  </div>
</template>

<script>
import { Form, Field } from 'vee-validate'
import { nextTick, onMounted, reactive, ref, watch } from 'vue'
import schema from '@/uitls/vee-validate-schema'
import QC from 'qc'
import { loginApi, loginMobileWithCodeApi } from '@/api'
import useLoginRedirect from '@/hook/useLoginRedirect'
import useSendCode from '@/hook/useSendCode'
import message from '@/components/library/message'
import { useStore } from 'vuex'

export default {
  name: 'LoginForm',
  components: { Form, Field },
  setup() {
    const isMsgLogin = ref(false)
    const form = ref({
      isAgree: true,
      account: 'nmynmy',
      password: '123456',
      mobile: '',
      code: null
    })
    const formCom = ref(null)
    const onMsgLoginChange = (flag) => {
      formCom.value.resetForm()
      isMsgLogin.value = flag
      form.value = { isAgree: true }
    }
    const store = useStore()
    // 事件: 发送验证码 (发送验证码回调)
    const { codeNum, handleSendCode } = useSendCode()
    // 事件: 登录
    const handleLogin = async () => {
      const { valid } = await formCom.value.validate()
      if (valid) {
        if (!isMsgLogin.value) {
          // - 普通账号密码登录
          await normalLogin()
        } else {
          // - 手机验证码登录
          await mobileWithCodeLogin()
        }
      }
    }

    // 发送验证码
    async function sendCode() {
      // 1.验证手机号是否合法
      const { valid } = await formCom.value.validateField('mobile')
      if (!valid) return
      try {
        const { mobile } = form.value
        // 2.请求后台发送短信
        await handleSendCode(mobile)
      } catch (e) {
      }
    }

    /**
     * 普通账号密码登录
     */
    async function normalLogin() {
      const { account, password } = form.value
      try {
        // 1.登录
        await loginApi({ account, password })
        await store.dispatch('cart/mergeCart')
        // 登录后更新本地购物车列表
        // await store.dispatch('cart/fetchNewCart')
        // 2.登录成功后重定向, 默认是首页
        useLoginRedirect()
        message.success({ text: '登录成功' })
      } catch (e) {
        // request 已经封装, 会弹出错误提示
      }
    }

    /**
     * 手机验证码登录
     */
    async function mobileWithCodeLogin() {
      // 1.拿到手机号和code发送请求
      const { mobile, code } = form.value
      try {
        // 1.登录
        await loginMobileWithCodeApi({ mobile, code })
        await store.dispatch('cart/mergeCart')
        // 登录后更新本地购物车列表
        // await store.dispatch('cart/fetchNewCart')
        // 2.登录成功后重定向, 默认是首页
        useLoginRedirect()
        message.success({ text: '登录成功' })
      } catch (e) {
        // request 已经封装, 会弹出错误提示
      }
    }

    return {
      handleLogin,
      form,
      codeNum,
      schema,
      isMsgLogin,
      formCom,
      onMsgLoginChange,
      handleSendCode,
      sendCode
    }
  }
}
</script>

<style scoped lang='less'>
// 账号容器
.account-box {
  .toggle {
    padding: 15px 40px;
    text-align: right;

    a {
      color: @mainColor;

      i {
        font-size: 14px;
      }
    }
  }

  .form {
    padding: 0 40px;

    &-item {
      margin-bottom: 28px;

      .input {
        position: relative;
        height: 36px;

        > i {
          width: 34px;
          height: 34px;
          background: #cfcdcd;
          color: #fff;
          position: absolute;
          left: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 18px;
        }

        input {
          padding-left: 44px;
          border: 1px solid #cfcdcd;
          height: 36px;
          line-height: 36px;
          width: 100%;

          &.error {
            border-color: @priceColor;
          }

          &.active, &:focus {
            border-color: @mainColor;
          }
        }

        .code {
          position: absolute;
          right: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 14px;
          background: #f5f5f5;
          color: #666;
          width: 90px;
          height: 34px;
          cursor: pointer;
        }
      }

      > .error {
        position: absolute;
        font-size: 12px;
        line-height: 28px;
        color: @priceColor;

        i {
          font-size: 14px;
          margin-right: 2px;
        }
      }
    }

    .agree {
      a {
        color: #069;
      }
    }

    .btn {
      display: block;
      width: 100%;
      height: 40px;
      color: #fff;
      text-align: center;
      line-height: 40px;
      background: @mainColor;

      &.disabled {
        background: #cfcdcd;
      }
    }
  }

  .action {
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .url {
      a {
        color: #999;
        margin-left: 10px;
      }
    }
  }
}
</style>

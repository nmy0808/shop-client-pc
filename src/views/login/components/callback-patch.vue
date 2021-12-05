<template>
  <Form class='c-form' ref='formCom' v-slot='{errors}'>
    <div class='c-form-item'>
      <div class='field'>
        <i class='icon iconfont icon-user'></i>
        <Field v-model='form.account' name='account' class='input' type='text' :rules='schema.account'
               placeholder='请输入用户名' />
      </div>
      <div class='error' v-if='errors.account'>{{ errors.account }}</div>
    </div>
    <div class='c-form-item'>
      <div class='field'>
        <i class='icon iconfont icon-phone'></i>
        <Field v-model='form.mobile' name='mobile' class='input' type='text' :rules='schema.mobile'
               placeholder='请输入手机号' />
      </div>
      <div class='error' v-if='errors.mobile'>{{ errors.mobile }}</div>
    </div>
    <div class='c-form-item'>
      <div class='field'>
        <i class='icon iconfont icon-code'></i>
        <Field v-model='form.code' name='code' class='input' type='text' :rules='schema.code' placeholder='请输入验证码' />
        <span class='code' @click='sendCode'>
          <template v-if='codeNum<=0'>
            发送验证码
          </template>
           <template v-else>
            {{ codeNum }}s后可重发
          </template>
        </span>
      </div>
      <div class='error' v-if='errors.code'>{{ errors.code }}</div>
    </div>
    <div class='c-form-item'>
      <div class='field'>
        <i class='icon iconfont icon-lock'></i>
        <Field v-model='form.password' name='password' class='input' type='password' :rules='schema.password'
               placeholder='请输入密码' />
      </div>
      <div class='error' v-if='errors.password'>{{ errors.password }}</div>
    </div>
    <div class='c-form-item'>
      <div class='field'>
        <i class='icon iconfont icon-lock'></i>
        <Field name='rePassword' class='input' type='password' :rules='schema.rePassword' placeholder='请确认密码' />
      </div>
      <div class='error' v-if='errors.rePassword'>{{ errors.rePassword }}</div>
    </div>
    <a href='javascript:;' class='submit' @click='handleSubmit'>立即提交</a>
  </Form>
</template>

<script>
import useSendCode from '@/hook/useSendCode'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { computed, inject, ref } from 'vue'
import { Form, Field } from 'vee-validate'
import schema from '@/uitls/vee-validate-schema'
import { bindUserInfoByUnionIdApi } from '@/api'
import useLoginRedirect from '@/hook/useLoginRedirect'
import message from '@/components/library/message'

export default {
  name: 'CallbackPatch',
  components: { Form, Field },
  setup() {
    const store = useStore()
    const formCom = ref(null)
    const form = ref({})
    const unionId = inject('unionId')
    const { codeNum, handleSendCode } = useSendCode()
    const sendCode = async () => {
      // 验证手机是否合法
      const { valid } = await formCom.value.validateField('mobile')
      if (valid) {
        try {
          // 如果合法就发送短信
          await handleSendCode(form.value.mobile, 'reg')
        } catch (e) {
        }
      }
    }
    const handleSubmit = async () => {
      // 验证表单
      const { valid } = await formCom.value.validate()
      if (valid) {
        // 发送绑定请求
        const params = {}
        params.unionId = unionId.value
        params.mobile = form.value.mobile
        params.account = form.value.account
        params.password = form.value.password
        params.code = form.value.code
        await bindUserInfoByUnionIdApi(params)
        await store.dispatch('cart/mergeCart')
        // 登录后更新本地购物车列表
        message.success({ text: '绑定成功' })
        // 绑定成功后跳转
        useLoginRedirect()
      }
    }
    return { form, codeNum, formCom, sendCode, schema, handleSubmit }
  }
}
</script>

<style scoped lang='less'>
.code {
  position: absolute;
  right: 0;
  top: 0;
  line-height: 50px;
  width: 80px;
  color: #999;

  &:hover {
    cursor: pointer;
  }
}
</style>

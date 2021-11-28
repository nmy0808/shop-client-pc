<template>
  <div class='c-form' v-if='userInfo'>
    <div class='user-info'>
      <img :src='userInfo.figureurl_1' alt='' />
      <p>Hi，{{ userInfo.nickname }} 欢迎来小兔鲜，完成绑定后可以QQ账号一键登录哦~</p>
    </div>
    <Form v-slot='{ errors }' ref='formCom'>
      <div class='c-form-item'>
        <div class='field'>
          <i class='icon iconfont icon-phone'></i>
          <Field v-model='form.mobile'
                 :rules='schema.mobile'
                 name='mobile' class='input' type='text' placeholder='绑定的手机号' />
        </div>
        <div class='error' v-if='errors.mobile'>{{ errors.mobile }}</div>
      </div>
      <div class='c-form-item'>
        <div class='field'>
          <i class='icon iconfont icon-code'></i>
          <Field v-model='form.code'
                 :rules='schema.code'
                 name='code' class='input' type='text' placeholder='短信验证码' />
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
    </Form>
    <a href='javascript:;' class='submit' @click='handSubmit'>立即绑定</a>
  </div>
</template>

<script>
import useSendCode from '@/hook/useSendCode'
import { inject, ref } from 'vue'
import { Form, Field } from 'vee-validate'
import schema from '@/uitls/vee-validate-schema'
import { bindMobileByUnionIdApi } from '@/api'
import useLoginRedirect from '@/hook/useLoginRedirect'

export default {
  name: 'CallbackBind',
  // eslint-disable-next-line vue/no-unused-components
  components: { Form, Field },
  setup() {
    const userInfo = inject('userInfo')
    const unionId = inject('unionId')
    const form = ref({
      mobile: '',
      code: ''
    })
    const formCom = ref(null)
    const { codeNum, handleSendCode } = useSendCode()
    // 事件: 提交绑定
    const handSubmit = async () => {
      // 验证表单
      const { valid } = await formCom.value.validate()
      if (valid) {
        // 发送绑定请求
        const params = {}
        params.unionId = unionId.value
        params.mobile = form.value.mobile
        params.code = form.value.code
        await bindMobileByUnionIdApi(params)
        // todo 绑定成功消息提示
        // 绑定成功后跳转
        useLoginRedirect()
      }
    }
    /**
     * 验证手机号并发送短信
     * @returns {Promise<void>}
     */
    const sendCode = async () => {
      // 验证手机是否合法
      const { valid } = await formCom.value.validateField('mobile')
      if (valid) {
        try {
          // 如果合法就发送短信
          await handleSendCode(form.value.mobile, 'bind')
          // todo 短信已发送的提示框
        } catch (e) {
        }
      }
    }

    return {
      formCom,
      codeNum,
      sendCode,
      userInfo,
      schema,
      form,
      handSubmit
    }
  }
}
</script>

<style scoped lang='less'>
.user-info {
  width: 320px;
  height: 70px;
  margin: 0 auto;
  display: flex;
  background: #f2f2f2;
  align-items: center;
  padding: 0 10px;
  margin-bottom: 25px;

  img {
    background: #f2f2f2;
    width: 50px;
    height: 50px;
  }

  p {
    padding-left: 10px;
  }
}

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

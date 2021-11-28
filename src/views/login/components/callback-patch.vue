<template>
  <div class='c-form'>
    <div class='c-form-item'>
      <div class='field'>
        <i class='icon iconfont icon-user'></i>
        <input class='input' type='text' placeholder='请输入用户名' />
      </div>
      <div class='error'></div>
    </div>
    <div class='c-form-item'>
      <div class='field'>
        <i class='icon iconfont icon-phone'></i>
        <input class='input' type='text' placeholder='请输入手机号' />
      </div>
      <div class='error'></div>
    </div>
    <div class='c-form-item'>
      <div class='field'>
        <i class='icon iconfont icon-code'></i>
        <input class='input' type='text' placeholder='请输入验证码' />
        <span class='code' @click='handleSendCode'>
          <template v-if='codeNum<=0'>
            发送验证码
          </template>
           <template v-else>
            {{ codeNum }}s后可重发
          </template>
        </span>
      </div>
      <div class='error'></div>
    </div>
    <div class='c-form-item'>
      <div class='field'>
        <i class='icon iconfont icon-lock'></i>
        <input class='input' type='password' placeholder='请输入密码' />
      </div>
      <div class='error'></div>
    </div>
    <div class='c-form-item'>
      <div class='field'>
        <i class='icon iconfont icon-lock'></i>
        <input class='input' type='password' placeholder='请确认密码' />
      </div>
      <div class='error'></div>
    </div>
    <a href='javascript:;' class='submit'>立即提交</a>
  </div>
</template>

<script>
import useSendCode from '@/hook/useSendCode'

export default {
  name: 'CallbackPatch',
  setup() {
    const sendStart = () => {
      console.log('start')
    }
    const { codeNum, handleSendCode } = useSendCode(sendStart)
    return { codeNum, handleSendCode }
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

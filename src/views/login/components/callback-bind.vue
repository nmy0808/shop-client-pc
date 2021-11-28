<template>
  <div class='c-form' v-if='userInfo'>
    <div class='user-info'>
      <img :src='userInfo.figureurl_1' alt='' />
      <p>Hi，{{ userInfo.nickname }} 欢迎来小兔鲜，完成绑定后可以QQ账号一键登录哦~</p>
    </div>
    <div class='c-form-item'>
      <div class='field'>
        <i class='icon iconfont icon-phone'></i>
        <input class='input' type='text' placeholder='绑定的手机号' />
      </div>
      <div class='error'></div>
    </div>
    <div class='c-form-item'>
      <div class='field'>
        <i class='icon iconfont icon-code'></i>
        <input class='input' type='text' placeholder='短信验证码' />
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
    <a href='javascript:;' class='submit'>立即绑定</a>
  </div>
</template>

<script>
import useSendCode from '@/hook/useSendCode'
import { inject } from 'vue'

export default {
  name: 'CallbackBind',
  setup() {
    const sendStart = () => {
      console.log('start')
    }
    const { codeNum, handleSendCode } = useSendCode(sendStart)
    const userInfo = inject('userInfo')
    return {
      codeNum,
      handleSendCode,
      userInfo
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

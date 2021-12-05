<template>
  <div class='c-confirm' v-show='isShow'>
    <div class='wrapper' ref='target'>
      <div class='header'>
        <h3>{{ title }}</h3>
        <a @click='isShow=false' href='JavaScript:;' class='iconfont icon-close-new'></a>
      </div>
      <div class='body'>
        <i class='iconfont icon-warning'></i>
        <span>{{ text }}</span>
      </div>
      <div class='footer'>
        <CButton size='mini' type='gray' @click='handleCancel'>取消</CButton>
        <CButton style='margin-left: 10px;' size='mini' type='primary' @click='handleConfirm'>确认</CButton>
      </div>
    </div>
  </div>
</template>
<script>
import CButton from '@/components/library/c-button'
import { onMounted, ref, watch } from 'vue'
import gsap from 'gsap'

export default {
  name: 'CConfirm',
  components: { CButton },
  props: {
    title: {
      type: String,
      default: '温馨提示'
    },
    text: {
      type: String,
      default: ''
    },
    cancel: {
      type: Function
    },
    confirm: {
      type: Function
    }
  },
  setup(props) {
    const isShow = ref(false)
    const target = ref(null)
    const handleCancel = () => {
      props.cancel()
      isShow.value = false
    }
    const handleConfirm = () => {
      props.confirm()
      isShow.value = false
    }
    onMounted(() => {
      isShow.value = true
    })
    watch(isShow, () => {
      if (isShow.value) {
        gsap.fromTo(target.value, { top: '40%', opacity: 0 }, { top: '50%', opacity: 1, duration: 0.1 })
      }
    })
    return {
      isShow,
      target,
      handleCancel,
      handleConfirm
    }
  }
}
</script>
<style scoped lang='less'>
.c-confirm {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 8888;
  background: rgba(0, 0, 0, .5);

  .wrapper {
    width: 400px;
    background: #fff;
    border-radius: 4px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    .header, .footer {
      height: 50px;
      line-height: 50px;
      padding: 0 20px;
    }

    .body {
      padding: 20px 40px;
      font-size: 16px;

      .icon-warning {
        color: @priceColor;
        margin-right: 3px;
        font-size: 16px;
      }
    }

    .footer {
      text-align: right;

      .xtx-button {
        margin-left: 20px;
      }
    }

    .header {
      position: relative;

      h3 {
        font-weight: normal;
        font-size: 18px;
      }

      a {
        position: absolute;
        right: 15px;
        top: 15px;
        font-size: 20px;
        width: 20px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        color: #999;

        &:hover {
          color: #666;
        }
      }
    }
  }
}
</style>

<template>
  <div class='c-dialog' :class='{fade:modelValue}' v-if='modelValue'>
    <div class='wrapper' :class='{fade:modelValue}'>
      <div class='header'>
        <h3>{{ title }}</h3>
        <a href='JavaScript:;' class='iconfont icon-close-new'></a>
      </div>
      <div class='body'>
        <slot></slot>
      </div>
      <div class='footer'>
        <CButton @click='cancel' type='gray' style='margin-right:20px'>取消</CButton>
        <CButton @click='confirm' type='primary'>确认</CButton>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, onMounted } from 'vue'

export default {
  name: 'CDialog',
  props: {
    title: {
      type: String,
      default: ''
    },
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  emits: ['cancel', 'confirm', 'update:modelValue'],
  setup(props, { emit }) {
    const cancel = () => {
      emit('cancel')
      emit('update:modelValue', false)
    }
    const confirm = () => {
      emit('confirm')
      emit('update:modelValue', false)
    }
    return { cancel, confirm }
  }
}
</script>
<style scoped lang='less'>
.c-dialog {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 8887;
  background: rgba(0, 0, 0, 0);

  &.fade {
    transition: all 0.4s;
    background: rgba(0, 0, 0, .5);
  }

  .wrapper {
    width: 600px;
    background: #fff;
    border-radius: 4px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -60%);
    opacity: 0;

    &.fade {
      transition: all 0.4s;
      transform: translate(-50%, -50%);
      opacity: 1;
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
      text-align: center;
      padding: 10px 0 30px 0;
    }

    .header {
      position: relative;
      height: 70px;
      line-height: 70px;
      padding: 0 20px;
      border-bottom: 1px solid #f5f5f5;

      h3 {
        font-weight: normal;
        font-size: 18px;
      }

      a {
        position: absolute;
        right: 25px;
        top: 25px;
        font-size: 24px;
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

<template>
  <div class='xtx-numbox'>
    <div v-if='label' class='label'>{{label}}</div>
    <div class='numbox'>
      <a href='javascript:;' @click='handleIncrement(-1)'>-</a>
      <input type='text' readonly :value='modelValue'>
      <a href='javascript:;' @click='handleIncrement(1)'>+</a>
    </div>
  </div>
</template>
<script>
import { ref } from 'vue'

export default {
  name: 'CNumbox',
  props: {
    label: String,
    min: {
      type: Number,
      default: 1
    },
    max: {
      type: Number
    },
    modelValue: {
      type: Number,
      default: 1
    }
  },
  setup(props, { emit }) {
    const handleIncrement = (dis) => {
      const targetValue = props.modelValue + dis
      if (targetValue < props.min || targetValue > props.max) return
      emit('update:modelValue', targetValue)
    }
    return {
      handleIncrement
    }
  }
}
</script>
<style scoped lang='less'>
.xtx-numbox {
  display: flex;
  align-items: center;

  .label {
    width: 60px;
    color: #999;
    padding-left: 10px;
  }

  .numbox {
    width: 120px;
    height: 30px;
    border: 1px solid #e4e4e4;
    display: flex;

    > a {
      width: 29px;
      line-height: 28px;
      text-align: center;
      background: #f8f8f8;
      font-size: 16px;
      color: #666;

      &:first-of-type {
        border-right: 1px solid #e4e4e4;
      }

      &:last-of-type {
        border-left: 1px solid #e4e4e4;
      }
    }

    > input {
      width: 60px;
      padding: 0 5px;
      text-align: center;
      color: #666;
    }
  }
}
</style>

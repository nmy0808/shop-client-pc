<template>
  <div class='c-checkbox' @click='changeChecked()'>
    <i v-if='checked' class='iconfont icon-checked'></i>
    <i v-else class='iconfont icon-unchecked'></i>
    <span v-if='$slots.default'><slot /></span>
  </div>
</template>
<script>
import { ref } from 'vue'

export default {
  name: 'CCheckbox',
  props: {
    modelValue: Boolean
  },
  setup(props, { emit }) {
    const checked = ref(false)
    const changeChecked = () => {
      checked.value = !checked.value
      emit('update:modelValue', checked.value)
      emit('change', checked.value)
    }
    return {
      checked,
      changeChecked
    }
  }
}
</script>
<style scoped lang='less'>
.c-checkbox {
  display: inline-block;
  margin-right: 2px;
  cursor: pointer;

  .icon-checked {
    color: @mainColor;

    ~ span {
      color: @mainColor;
    }
  }

  i {
    position: relative;
    top: 1px;
  }

  span {
    margin-left: 2px;
  }
}
</style>

<template>
  <div class='c-checkbox' @click='changeChecked()'>
    <i v-if='checked' class='iconfont icon-checked'></i>
    <i v-else class='iconfont icon-unchecked'></i>
    <span v-if='$slots.default'><slot /></span>
  </div>
</template>
<script>
import { ref, watch } from 'vue'

export default {
  name: 'CCheckbox',
  props: {
    modelValue: Boolean
  },
  setup(props, { emit }) {
    const checked = ref(false)
    // eslint-disable-next-line vue/no-setup-props-destructure
    checked.value = props.modelValue
    const changeChecked = () => {
      checked.value = !checked.value
      emit('update:modelValue', checked.value)
      emit('change', checked.value)
    }
    watch(() => props.modelValue, (val) => {
      checked.value = val
    })
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

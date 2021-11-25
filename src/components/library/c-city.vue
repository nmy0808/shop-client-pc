<template>
  <div class='c-city' ref='target'>
    <div class='select' @click='toggle'>
      <span class='placeholder'>{{ changeResult.fullLocation }}</span>
      <span class='value'></span>
      <i class='iconfont icon-angle-down'></i>
    </div>
    <div class='option' v-show='isShow'>
      <span class='ellipsis'
            @click='handleCitySelect(item)'
            v-for='item in currentCityPanelData'
            :key='item.code'>
        {{ item.name }}
      </span>
    </div>
  </div>
</template>
<script>
import { reactive, ref, watchEffect } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { getCityApi } from '@/api/city'

export default {
  name: 'CCity',
  props: {
    fullLocation: {
      type: String,
      default: ''
    }
  },
  emits: ['change'],
  setup(props, { emit }) {
    // 获取的城市数据
    const cityData = ref(null)
    const target = ref(null)
    const isShow = ref(false)
    const hide = () => {
      isShow.value = false
    }
    const show = () => {
      isShow.value = true
    }
    const toggle = () => {
      isShow.value = !isShow.value
    }
    //
    const changeResult = reactive({
      provinceCode: '',
      provinceName: '',
      cityCode: '',
      cityName: '',
      countyCode: '',
      countyName: '',
      fullLocation: '请选择收货地址'
    })
    // 当前面板显示的城市列表
    const currentCityPanelData = ref(null)
    // 当前已选择的城市级联关系
    const selectedList = ref([])
    // 方法: 选择城市
    const handleCitySelect = (item) => {
      selectedList.value[item.level] = item
      if (item.areaList && item.areaList.length > 0) {
        currentCityPanelData.value = item.areaList
      } else {
        // 拼接字符串形式显示
        changeResult.provinceName = selectedList.value[0].name
        changeResult.provinceCode = selectedList.value[0].code
        changeResult.cityName = selectedList.value[1].name
        changeResult.cityCode = selectedList.value[1].code
        changeResult.countyName = selectedList.value[2].name
        changeResult.countyCode = selectedList.value[2].code
        changeResult.fullLocation = selectedList.value.reduce((p, c) => `${p} ${c.name}`, '').trim()
        //  通知父级
        emit('change', JSON.parse(JSON.stringify(changeResult)))
        // 当前选择是最后一级, 关闭面板
        hide()
        // 初始化当前面板,恢复到省份选择
        initPanelData()
      }
    }
    //
    onClickOutside(target, () => {
      hide()
      initPanelData()
    })
    // 请求
    watchEffect(async () => {
      changeResult.fullLocation = props.fullLocation
      const { data } = await getCityApi()
      cityData.value = data
      // 初始化当前面板的数据
      currentCityPanelData.value = data
    })

    // 初始化当前面板,恢复到省份选择
    function initPanelData() {
      currentCityPanelData.value = cityData.value
    }

    return {
      cityData,
      changeResult,
      currentCityPanelData,
      selectedList,
      target,
      isShow,
      hide,
      show,
      toggle,
      handleCitySelect
    }
  }
}
</script>
<style scoped lang='less'>
.c-city {
  display: inline-block;
  position: relative;
  z-index: 400;

  .select {
    border: 1px solid #e4e4e4;
    height: 30px;
    padding: 0 5px;
    line-height: 28px;
    cursor: pointer;

    &.active {
      background: #fff;
    }

    .placeholder {
      color: #999;
    }

    .value {
      color: #666;
      font-size: 12px;
    }

    i {
      font-size: 12px;
      margin-left: 5px;
    }
  }

  .option {
    width: 542px;
    border: 1px solid #e4e4e4;
    position: absolute;
    left: 0;
    top: 29px;
    background: #fff;
    min-height: 30px;
    line-height: 30px;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;

    > span {
      width: 130px;
      text-align: center;
      cursor: pointer;
      border-radius: 4px;
      padding: 0 3px;

      &:hover {
        background: #f5f5f5;
      }
    }
  }
}
</style>

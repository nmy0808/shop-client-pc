<template>
  <HomePanel ref='target' title='热门品牌' sub-title='国际经典 品质保证'>
    <template v-slot:right>
      <a href='javascript:;' @click='handleSkip(currentIndex - 1)' class='iconfont icon-angle-left prev'
         :class='{disabled:currentIndex === 0}'></a>
      <a href='javascript:;' @click='handleSkip(currentIndex + 1)' class='iconfont icon-angle-right next'
         :class='{disabled:currentIndex === data.length / 5 -1}'></a>
    </template>
    <div class='box' ref='boxWrap'>
      <ul class='list' :style='{transform: `translateX(-${currentIndex * boxWidth}px)`}'>
        <li v-for='item in data' :key='item.id'>
          <RouterLink to='/'>
            <img v-lazy='item.picture'>
          </RouterLink>
        </li>
      </ul>
    </div>
  </HomePanel>
</template>

<script>
import HomePanel from './home-panel'
import useLazyData from '@/hook/useLazyData'
import { getHotBrandsApi } from '@/api'
import { onMounted, ref } from 'vue'

export default {
  name: 'HomeBrand',
  components: { HomePanel },
  setup() {
    const { target, data } = useLazyData(() => getHotBrandsApi(10))
    const currentIndex = ref(0)
    const handleSkip = (index) => {
      currentIndex.value = index
    }
    const boxWrap = ref(null)
    const boxWidth = ref(null)
    onMounted(() => {
      boxWidth.value = boxWrap.value.clientWidth
    })
    return {
      currentIndex,
      target,
      boxWrap,
      boxWidth,
      data,
      handleSkip
    }
  }
}
</script>

<style scoped lang='less'>
.home-panel {
  background: #f5f5f5
}

.iconfont {
  width: 20px;
  height: 20px;
  background: #ccc;
  color: #fff;
  display: inline-block;
  text-align: center;
  margin-left: 5px;
  background: @mainColor;

  &::before {
    font-size: 12px;
    position: relative;
    top: -2px
  }

  &.disabled {
    background: #ccc;
    pointer-events : none;
    cursor: not-allowed;
  }
}

.box {
  display: flex;
  width: 100%;
  height: 345px;
  overflow: hidden;
  padding-bottom: 40px;

  .list {
    width: 200%;
    display: flex;
    transition: all 1s;

    li {
      margin-right: 10px;
      width: 240px;

      &:nth-child(5n) {
        margin-right: 0;
      }

      img {
        width: 240px;
        height: 305px;
      }
    }
  }
}
</style>

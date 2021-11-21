<template>
  <HomePanel ref="target" title="热门品牌" sub-title="国际经典 品质保证">
    <template v-slot:right>
      <a href="javascript:;" class="iconfont icon-angle-left prev"></a>
      <a href="javascript:;" class="iconfont icon-angle-right next"></a>
    </template>
    <div class="box" ref="box">
      <ul class="list">
        <li v-for="i in 10" :key="i">
          <RouterLink to="/">
            <img v-lazy="`//zhoushugang.gitee.io/erabbit-client-pc-static/uploads/brand_goods_1.jpg`" src="" alt="">
          </RouterLink>
        </li>
      </ul>
    </div>
  </HomePanel>
</template>

<script>
import HomePanel from './home-panel'
import useLazyData from '@/hook/useLazyData'

export default {
  name: 'HomeBrand',
  components: { HomePanel },
  setup () {
    // const { target } = useLazyData(() => {
    // })
    // return {
    //   target
    // }
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

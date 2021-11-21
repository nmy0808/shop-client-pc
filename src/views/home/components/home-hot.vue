<template>
  <HomePanel title='人气推荐' sub-title='人气爆款 不容错过'>
    <ul ref='target' class='goods-list'>
      <li v-for='item in list' :key='item.id'>
        <RouterLink to='/'>
          <img v-lazy='item.picture' :alt='item.alt'>
          <p class='name'>{{item.title}}</p>
          <p class='desc'>{{ item.alt }}</p>
        </RouterLink>
      </li>
    </ul>
  </HomePanel>
</template>

<script>
import HomePanel from './home-panel'
import { getHotApi } from '@/api'
import useLazyData from '@/hook/useLazyData'

export default {
  name: 'HomeHot',
  components: { HomePanel },
  setup() {
    const { target, data } = useLazyData(getHotApi)
    return {
      target, list: data
    }
  }
}
</script>

<style scoped lang='less'>
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 426px;

  li {
    width: 306px;
    height: 406px;
    .hoverShadow();

    img {
      width: 306px;
      height: 306px;
    }

    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
    }

    .desc {
      color: #999;
      font-size: 18px;
    }
  }
}
</style>

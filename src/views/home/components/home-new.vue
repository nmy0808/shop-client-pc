<template>
  <div class="home-new">
    <HomePanel title="新鲜好物" sub-title="新鲜出炉 品质靠谱">
      <template #right>
        <c-more path="/"/>
      </template>
      <!-- 面板内容 -->
      <ul class="goods-list">
        <li v-for="item in 4" :key="item">
          <RouterLink to="/">
            <img src="https://yanxuan-item.nosdn.127.net/3892e311f3494d2bcc2c1f8ed9e34271.png" alt="">
            <p class="name ellipsis">biaoti</p>
            <p class="price">&yen;价格</p>
          </RouterLink>
        </li>
      </ul>
    </HomePanel>
  </div>
</template>
<script>
import { ref } from 'vue'
import HomePanel from './home-panel'

export default {
  name: 'HomeNew',
  components: { HomePanel },
  setup () {
    return {}
  }
}
</script>
<style scoped lang="less">
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;

  li {
    width: 306px;
    height: 406px;
    background: #f0f9f4;
    .hoverShadow();

    img {
      width: 306px;
      height: 306px;
    }

    p {
      font-size: 22px;
      padding: 12px 30px 0 30px;
      text-align: center;
    }

    .price {
      color: @priceColor;
    }
  }
}
</style>

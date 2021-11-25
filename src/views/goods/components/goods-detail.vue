<template>
  <div class='goods-detail'>
    <!-- 属性 -->
    <ul class='attrs' v-if='goods.length'>
      <li v-for='item in goods.details.properties' :key='item.value'>
        <span class='dt'>{{ item.name }}</span>
        <span class='dd'>{{ item.value }}</span>
      </li>
    </ul>
    <!-- 图片 -->
    <img v-for='item in 1' :key='item' src='https://yanxuan-item.nosdn.127.net/0b1c902757b9f25b8f51c6bc6855e902.jpg' alt=''>
  </div>
</template>
<script>
export default {
  name: 'GoodsDetail',
  setup() {
    const goods = []
    return { goods }
  }
}
</script>
<style scoped lang='less'>
.goods-detail {
  padding: 40px;

  .attrs {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 30px;

    li {
      display: flex;
      margin-bottom: 10px;
      width: 50%;

      .dt {
        width: 100px;
        color: #999;
      }

      .dd {
        flex: 1;
        color: #666;
      }
    }
  }

  > img {
    width: 100%;
  }
}
</style>

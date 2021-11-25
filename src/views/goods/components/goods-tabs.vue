<template>
  <div className='goods-tabs'>
    <nav>
      <a className='active' href='javascript:;'>商品详情</a>
      <a href='javascript:;'>商品评价<span>(500+)</span></a>
    </nav>
    <!-- 切换内容的地方 -->
    <component :is='`GoodsComment`'/>
  </div>
</template>
<script>
import GoodsDetail from '@/views/goods/components/goods-detail'
import GoodsComment from '@/views/goods/components/goods-comment'

export default {
  name: 'GoodsTabs',
  // eslint-disable-next-line vue/no-unused-components
  components: { GoodsComment, GoodsDetail }
}
</script>
<style lang='less' scoped>
.goods-tabs {
  min-height: 600px;
  background: #fff;

  nav {
    height: 70px;
    line-height: 70px;
    display: flex;
    border-bottom: 1px solid #f5f5f5;

    a {
      padding: 0 40px;
      font-size: 18px;
      position: relative;

      > span {
        color: @priceColor;
        font-size: 16px;
        margin-left: 10px;
      }

      &:first-child {
        border-right: 1px solid #f5f5f5;
      }

      &.active {
        &::before {
          content: "";
          position: absolute;
          left: 40px;
          bottom: -1px;
          width: 72px;
          height: 2px;
          background: @mainColor;
        }
      }
    }
  }
}
</style>

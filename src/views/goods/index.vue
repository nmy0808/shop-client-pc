<template>
  <div class='xtx-goods-page'>
    <div class='container'>
      <!-- 面包屑 -->
      <CBread>
        <CBreadItem to='/'>首页</CBreadItem>
        <CBreadItem to='/'>手机</CBreadItem>
        <CBreadItem to='/'>华为</CBreadItem>
        <CBreadItem to='/'>p30</CBreadItem>
      </CBread>
      <!-- 商品信息 -->
      <div class='goods-info'>
        <div class='media'>
          <!--商品图片-->
          <goods-image></goods-image>
          <goods-sales></goods-sales>
        </div>
        <div class='spec'>
          <!--标题,城市-->
          <good-name></good-name>
          <goods-sku></goods-sku>
          <c-numbox></c-numbox>
          <c-button type='primary' style='margin-top: 20px;'>加入购物车</c-button>
        </div>
      </div>
      <!-- 商品推荐 -->
      <GoodsRelevant />
      <!-- 商品详情 -->
      <div class='goods-footer'>
        <div class='goods-article'>
          <!-- 商品+评价 -->
          <div class='goods-tabs'>
            <goods-tabs></goods-tabs>
          </div>
          <!-- 商品详情 -->
          <!-- 注意事项 -->
          <div class='goods-warn'>
            <goods-warn></goods-warn>
          </div>
        </div>
        <!-- 24热榜+专题推荐 -->
        <div class='goods-aside'>
          <goods-hot :type='1'></goods-hot>
          <goods-hot :type='2'></goods-hot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GoodsRelevant from './components/goods-relevant'
import GoodsImage from '@/views/goods/components/goods-image'
import GoodsSales from '@/views/goods/components/goods-sales'
import GoodName from '@/views/goods/components/goods-name'
import GoodsSku from '@/components/library/goods-sku'
import GoodsTabs from '@/views/goods/components/goods-tabs'
import GoodsHot from '@/views/goods/components/goods-hot'
import GoodsWarn from '@/views/goods/components/goods-warn'

export default {
  name: 'GoodsPage',
  components: { GoodsWarn, GoodsHot, GoodsTabs, GoodsSku, GoodName, GoodsSales, GoodsImage, GoodsRelevant }
}
</script>

<style scoped lang='less'>
.goods-info {
  min-height: 600px;
  background: #fff;
  display: flex;

  .media {
    width: 580px;
    height: 600px;
    padding: 30px 50px;
  }

  .spec {
    flex: 1;
    padding: 30px 30px 30px 0;
  }
}

.goods-footer {
  display: flex;
  margin-top: 20px;

  .goods-article {
    width: 940px;
    margin-right: 20px;
  }

  .goods-aside {
    width: 280px;
    min-height: 1000px;
  }
}

.goods-tabs {
  min-height: 600px;
  background: #fff;
}

.goods-warn {
  min-height: 600px;
  background: #fff;
  margin-top: 20px;
}
</style>

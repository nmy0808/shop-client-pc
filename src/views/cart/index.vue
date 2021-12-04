<template>
  <div class='c-cart-page'>
    <div class='container'>
      <CBread>
        <CBreadItem to='/'>首页</CBreadItem>
        <CBreadItem>购物车</CBreadItem>
      </CBread>
      <div class='cart'>
        <table>
          <thead>
          <tr>
            <th width='120'>
              <CCheckbox>全选</CCheckbox>
            </th>
            <th width='400'>商品信息</th>
            <th width='220'>单价</th>
            <th width='180'>数量</th>
            <th width='180'>小计</th>
            <th width='140'>操作</th>
          </tr>
          </thead>
          <!-- 有效商品 -->
          <tbody>
          <tr v-for='i in 3' :key='i'>
            <td>
              <CCheckbox />
            </td>
            <td>
              <div class='goods'>
                <RouterLink to='/'><img src='https://yanxuan-item.nosdn.127.net/13ab302f8f2c954d873f03be36f8fb03.png'
                                        alt=''></RouterLink>
                <div>
                  <p class='name ellipsis'>和手足干裂说拜拜 ingrams手足皲裂修复霜</p>
                  <!-- 选择规格组件 -->
                </div>
              </div>
            </td>
            <td class='tc'>
              <p>&yen;200.00</p>
              <p>比加入时降价 <span class='red'>&yen;20.00</span></p>
            </td>
            <td class='tc'>
              <CNumbox />
            </td>
            <td class='tc'><p class='f16 red'>&yen;200.00</p></td>
            <td class='tc'>
              <p><a href='javascript:;'>移入收藏夹</a></p>
              <p><a class='green' href='javascript:;'>删除</a></p>
              <p><a href='javascript:;'>找相似</a></p>
            </td>
          </tr>
          </tbody>
          <!-- 无效商品 -->
          <tbody>
          <tr>
            <td colspan='6'><h3 class='tit'>失效商品</h3></td>
          </tr>
          <tr v-for='i in 3' :key='i'>
            <td>
              <CCheckbox style='color:#eee;' />
            </td>
            <td>
              <div class='goods'>
                <RouterLink to='/'><img src='https://yanxuan-item.nosdn.127.net/13ab302f8f2c954d873f03be36f8fb03.png'
                                        alt=''></RouterLink>
                <div>
                  <p class='name ellipsis'>和手足干裂说拜拜 ingrams手足皲裂修复霜</p>
                  <p class='attr'>颜色：粉色 尺寸：14cm 产地：中国</p>
                </div>
              </div>
            </td>
            <td class='tc'><p>&yen;200.00</p></td>
            <td class='tc'>1</td>
            <td class='tc'><p>&yen;200.00</p></td>
            <td class='tc'>
              <p><a class='green' href='javascript:;'>删除</a></p>
              <p><a href='javascript:;'>找相似</a></p>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <!-- 操作栏 -->
      <div class='action'>
        <div class='batch'>
          <CCheckbox>全选</CCheckbox>
          <a href='javascript:;'>删除商品</a>
          <a href='javascript:;'>移入收藏夹</a>
          <a href='javascript:;'>清空失效商品</a>
        </div>
        <div class='total'>
          共 7 件商品，已选择 2 件，商品合计：
          <span class='red'>¥400</span>
          <CButton type='primary'>下单结算</CButton>
        </div>
      </div>
      <!-- 猜你喜欢 -->
      <GoodRelevant />
    </div>
  </div>
</template>
<script>
import GoodRelevant from '@/views/goods/components/goods-relevant'

export default {
  name: 'CCartPage',
  components: { GoodRelevant }
}
</script>
<style scoped lang='less'>
.tc {
  text-align: center;

  .xtx-numbox {
    margin: 0 auto;
    width: 120px;
  }
}

.red {
  color: @priceColor;
}

.green {
  color: @mainColor
}

.f16 {
  font-size: 16px;
}

.goods {
  display: flex;
  align-items: center;

  img {
    width: 100px;
    height: 100px;
  }

  > div {
    width: 280px;
    font-size: 16px;
    padding-left: 10px;

    .attr {
      font-size: 14px;
      color: #999;
    }
  }
}

.action {
  display: flex;
  background: #fff;
  margin-top: 20px;
  height: 80px;
  align-items: center;
  font-size: 16px;
  justify-content: space-between;
  padding: 0 30px;

  .xtx-checkbox {
    color: #999;
  }

  .batch {
    a {
      margin-left: 20px;
    }
  }

  .red {
    font-size: 18px;
    margin-right: 20px;
    font-weight: bold;
  }
}

.tit {
  color: #666;
  font-size: 16px;
  font-weight: normal;
  line-height: 50px;
}

.c-cart-page {
  .cart {
    background: #fff;
    color: #666;

    table {
      border-spacing: 0;
      border-collapse: collapse;
      line-height: 24px;

      th, td {
        padding: 10px;
        border-bottom: 1px solid #f5f5f5;

        &:first-child {
          text-align: left;
          padding-left: 30px;
          color: #999;
        }
      }

      th {
        font-size: 16px;
        font-weight: normal;
        line-height: 50px;
      }
    }
  }
}
</style>

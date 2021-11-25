<template>
  <p className='g-name'>{{ goodDetail.name }}</p>
  <p className='g-desc'>{{ goodDetail.desc }}</p>
  <p className='g-price'>
    <span>{{ goodDetail.price }}</span>
    <span>{{ goodDetail.oldPrice }}</span>
  </p>
  <div className='g-service'>
    <dl>
      <dt>促销</dt>
      <dd>12月好物放送，App领券购买直降120元</dd>
    </dl>
    <dl>
      <dt>配送</dt>
      <dd>至
        <c-city :fullLocation='fullLocation' @change='handleCityChange'></c-city>
      </dd>
    </dl>
    <dl>
      <dt>服务</dt>
      <dd>
        <span>无忧退货</span>
        <span>快速退款</span>
        <span>免费包邮</span>
        <a href='javascript:;'>了解详情</a>
      </dd>
    </dl>
  </div>
</template>

<script>
import { inject, ref } from 'vue'

export default {
  name: 'GoodName',
  components: {},
  props: {
    goodDetail: {
      type: Object,
      default: () => ({})
    }
  },
  setup() {
    // 默认地址
    const provinceCode = ref('110000')
    const cityCode = ref('119900')
    const countyCode = ref('110101')
    const fullLocation = ref('北京市 市辖区 东城区')
    const goodDetail = inject('goodDetail')
    // 取出用户收货地址中默认的地址给四个数据赋值 (已登录)
    if (goodDetail.userAddresses) {
      const defaultAddr = goodDetail.userAddresses.find(addr => addr.isDefault === 1)
      if (defaultAddr) {
        provinceCode.value = defaultAddr.provinceCode
        cityCode.value = defaultAddr.cityCode
        countyCode.value = defaultAddr.countyCode
        fullLocation.value = defaultAddr.fullLocation
      }
    }
    // 接收到选中的city数据
    const handleCityChange = (result) => {
      provinceCode.value = result.provinceCode
      cityCode.value = result.cityCode
      countyCode.value = result.countyCode
      fullLocation.value = result.fullLocation
    }
    return {
      handleCityChange,
      fullLocation
    }
  }
}
</script>

<style lang='less' scoped>
.g-name {
  font-size: 22px
}

.g-desc {
  color: #999;
  margin-top: 10px;
}

.g-price {
  margin-top: 10px;

  span {
    &::before {
      content: "¥";
      font-size: 14px;
    }

    &:first-child {
      color: @priceColor;
      margin-right: 10px;
      font-size: 22px;
    }

    &:last-child {
      color: #999;
      text-decoration: line-through;
      font-size: 16px;
    }
  }
}

.g-service {
  background: #f5f5f5;
  width: 500px;
  padding: 20px 10px 0 10px;
  margin-top: 10px;

  dl {
    padding-bottom: 20px;
    display: flex;
    align-items: center;

    dt {
      width: 50px;
      color: #999;
    }

    dd {
      color: #666;

      &:last-child {
        span {
          margin-right: 10px;

          &::before {
            content: "•";
            color: @mainColor;
            margin-right: 2px;
          }
        }

        a {
          color: @mainColor;
        }
      }
    }
  }
}
</style>

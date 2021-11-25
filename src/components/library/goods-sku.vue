<template>
  <div class='goods-sku'>
    <!--    disabled | selected -->
    <dl v-for='item in specs' :key='item.name'>
      <dt>{{ item.name }}</dt>
      <dd>
        <template v-for='val in item.values' :key='val.name'>
          <img v-if='val.picture' :src='val.picture' :title='val.name' />
          <span v-else class=''>{{ val.name }}</span>
        </template>
      </dd>
    </dl>
  </div>
</template>
<script>
import { computed, inject } from 'vue'

export default {
  name: 'GoodsSku',
  setup() {
    const goodDetail = inject('goodDetail')
    const specs = goodDetail.value.specs
    return {
      specs
    }
  }
}
</script>
<style scoped lang='less'>
.sku-state-mixin () {
  border: 1px solid #e4e4e4;
  margin-right: 10px;
  cursor: pointer;
  &.selected {
    border-color: @mainColor;
  }
  &.disabled {
    opacity: 0.6;
    border-style: dashed;
    cursor: not-allowed;
  }
}

.goods-sku {
  padding-left: 10px;
  padding-top: 20px;

  dl {
    display: flex;
    padding-bottom: 20px;
    align-items: center;

    dt {
      width: 50px;
      color: #999;
    }

    dd {
      flex: 1;
      color: #666;

      > img {
        width: 50px;
        height: 50px;
        .sku-state-mixin ();
      }

      > span {
        display: inline-block;
        height: 30px;
        line-height: 28px;
        padding: 0 20px;
        .sku-state-mixin ();
      }
    }
  }
}
</style>

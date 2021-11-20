<template>
  <div class='home-category' @mouseleave="currentMenu = {}">
    <ul class="menu">
      <li v-for="menu in menus" :class="{active: currentMenu.id && currentMenu.id === menu.id }" :key="menu.id"
          @mouseenter="handleMenuActive(menu)">
        <RouterLink to="/">{{ menu.name }}</RouterLink>
        <template v-if="menu.children">
          <RouterLink v-for="it in menu.children" :key="it.id" to="/">{{ it.name }}</RouterLink>
        </template>
        <template v-else>
          <c-skeleton width="50px" height="20px" bg="rgba(255,255,255,0.1)" gutter="5px" animate-type="fade"></c-skeleton>
          <c-skeleton width="50px" height="20px" bg="rgba(255,255,255,0.1)" gutter="5px" animate-type="fade"></c-skeleton>
        </template>
      </li>
    </ul>
    <!-- 弹层 -->
    <div class="layer">
      <h4>{{ currentMenu.id !== 'brand' ? '分类' : '品牌' }}推荐 <small>根据您的购买或浏览记录推荐</small></h4>
      <ul v-show="currentMenu.goods && currentMenu.id !=='brand'">
        <li v-for="item in currentMenu.goods" :key="item.id">
          <RouterLink to="/">
            <img :src="item.picture" :alt="item.desc">
            <div class="info">
              <p class="name ellipsis-2">{{ item.name }}</p>
              <p class="desc ellipsis">{{ item.desc }}</p>
              <p class="price"><i>¥</i>{{ item.price }}</p>
            </div>
          </RouterLink>
        </li>
      </ul>
      <ul v-show="currentMenu.id ==='brand'">
        <li class="brand" v-for="item in brands" :key="item.id">
          <RouterLink to="/">
            <img :src="item.logo" alt="">
            <div class="info">
              <p class="place"><i class="iconfont icon-dingwei"></i>{{ item.item }}</p>
              <p class="name ellipsis">{{ item.name }}</p>
              <p class="desc ellipsis-2">{{ item.desc }}</p>
            </div>
          </RouterLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed, onMounted, reactive, ref } from 'vue'
import { getHotBrandsApi } from '@/api'
import CSkeleton from '@/components/library/c-skeleton'

export default {
  name: 'HomeCategory',
  components: { CSkeleton },
  setup () {
    const store = useStore()
    const currentMenu = ref({}) // 当前激活的菜单
    const brands = ref([]) // 品牌列表
    const brand = reactive({
      id: 'brand',
      name: '品牌',
      children: [{
        id: 'brand-children',
        name: '品牌推荐'
      }]
    })
    // 返回的数据没有品牌, 在数组最后一项增加品牌
    const menus = computed(() => {
      const list = store.state.category.list.map(item => {
        return {
          id: item.id,
          name: item.name,
          goods: item.goods,
          // 防止初始化没有children的时候调用slice函数报错
          children: item.children && item.children.slice(0, 2)
        }
      })
      list.push(brand)
      return list
    })
    const handleMenuActive = (menu) => {
      currentMenu.value = menu
    }
    // 请求: 获取品牌列表
    const getBrands = async () => {
      const data = await getHotBrandsApi(6)
      brands.value = data
    }
    // 声明周期
    onMounted(async () => {
      await getBrands()
    })
    return {
      menus,
      brands,
      handleMenuActive,
      currentMenu
    }
  }
}
</script>

<style scoped lang='less'>
.home-category {
  width: 250px;
  height: 500px;
  background: rgba(0, 0, 0, 0.8);
  position: relative;
  z-index: 99;

  .menu {
    li {
      padding-left: 40px;
      height: 50px;
      line-height: 50px;

      &:hover, &.active {
        background: @mainColor;
      }

      a {
        margin-right: 4px;
        color: #fff;

        &:first-child {
          font-size: 16px;
        }
      }
    }
  }

  .layer {
    width: 990px;
    height: 500px;
    background: rgba(255, 255, 255, 0.8);
    position: absolute;
    left: 250px;
    top: 0;
    display: none;
    padding: 0 15px;

    h4 {
      font-size: 20px;
      font-weight: normal;
      line-height: 80px;

      small {
        font-size: 16px;
        color: #666;
      }
    }

    ul {
      display: flex;
      flex-wrap: wrap;

      li {
        width: 310px;
        height: 120px;
        margin-right: 15px;
        margin-bottom: 15px;
        border: 1px solid #eee;
        border-radius: 4px;
        background: #fff;

        &:nth-child(3n) {
          margin-right: 0;
        }

        a {
          display: flex;
          width: 100%;
          height: 100%;
          align-items: center;
          padding: 10px;

          &:hover {
            background: #e3f9f4;
          }

          img {
            width: 95px;
            height: 95px;
          }

          .info {
            padding-left: 10px;
            line-height: 24px;
            width: 190px;

            .name {
              font-size: 16px;
              color: #666;
            }

            .desc {
              color: #999;
            }

            .price {
              font-size: 22px;
              color: @priceColor;

              i {
                font-size: 16px;
              }
            }
          }
        }
      }

      li.brand {
        height: 180px;

        a {
          align-items: flex-start;

          img {
            width: 120px;
            height: 160px;
          }

          .info {
            p {
              margin-top: 8px;
            }

            .place {
              color: #999;
            }
          }
        }
      }
    }
  }

  &:hover {
    .layer {
      display: block;
    }
  }
}
</style>

<template>
  <div class='top-category container'>
    <c-bread>
      <c-bread-item :to='{name: "home"}'>首页</c-bread-item>
      <transition name='fade-right' mode='out-in'>
        <c-bread-item :key='categoryName'>{{ categoryName }}</c-bread-item>
      </transition>
    </c-bread>
    <div class='category-banner'>
      <home-banner></home-banner>
    </div>
    <!-- 所有二级分类 -->
    <div class='sub-list'>
      <h3>全部分类</h3>
      <ul>
        <li v-for='item in subCateGoryList' :key='item.id'>
          <router-link :to='{name: "categorySub", params: {id: item.id}}'>
            <img :src='item.picture' alt=''>
            <p>{{ item.name }}</p>
          </router-link>
        </li>
      </ul>
    </div>
    <!-- 不同分类商品 -->
    <div class='ref-goods' v-for='item in goodList' :key='item.id'>
      <div class='head'>
        <h3>- {{ item.name }} -</h3>
        <p class='tag'>温暖柔软，品质之选</p>
        <CMore />
      </div>
      <div class='body' v-if='item.goods'>
        <GoodsItem v-for='good in item.goods' :data='good' :key='good' />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onUnmounted, ref, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import CBread from '@/components/library/c-bread'
import CBreadItem from '@/components/library/c-bread-item'
import { useStore } from 'vuex'
import HomeBanner from '@/views/home/components/home-banner'
import GoodsItem from '@/views/category/components/goods-item'
import CMore from '@/components/library/c-more'
import { getTopCategoryApi } from '@/api'

export default {
  name: 'category-page',
  // eslint-disable-next-line vue/no-unused-components
  components: { CMore, GoodsItem, HomeBanner, CBreadItem, CBread },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    // - data
    // 当前分类名称
    const categoryName = ref('')
    // 当前子分类集合
    const subCateGoryList = ref([])
    // 当前分类id
    const currentCategoryId = computed(() => route.params.id)
    // 当前分类数据对象 , 默认值{}
    const currentCategory = computed(() => {
      return store.state.category.list.filter(item => item.id === currentCategoryId.value)[0] || {}
    })
    // 当前分类商品列表
    const goodList = ref([])
    // - method
    // 获取当前面包屑
    const getCurrentBread = () => {
      categoryName.value = currentCategory.value.name
    }
    // 获取当前子分类集合
    const getCurrentSubCategory = () => {
      subCateGoryList.value = currentCategory.value.children
    }
    // 获取分类商品列表
    const getGoodsList = async () => {
      const { children } = await getTopCategoryApi(currentCategoryId.value)
      goodList.value = children
    }
    // 监听id
    const stop = watchEffect(() => {
      if (route.name !== 'category') return
      if (currentCategoryId.value === 'undefined') {
        router.push({ name: 'home' })
        return
      }
      getCurrentBread()
      getCurrentSubCategory()
      getGoodsList()
    })
    onUnmounted(() => {
      stop()
    })
    return { categoryName, subCateGoryList, goodList }
  }
}
</script>

<style scoped lang='less'>
.category-banner {
  position: relative;
  height: 500px;
}

.top-category {
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }

  .sub-list {
    margin-top: 20px;
    background-color: #fff;

    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;

      li {
        width: 168px;
        height: 160px;

        a {
          text-align: center;
          display: block;
          font-size: 16px;

          img {
            width: 100px;
            height: 100px;
          }

          p {
            line-height: 40px;
          }

          &:hover {
            color: @mainColor;
          }
        }
      }
    }
  }

  .ref-goods {
    background-color: #fff;
    margin-top: 20px;
    position: relative;

    .head {
      .xtx-more {
        position: absolute;
        top: 20px;
        right: 20px;
      }

      .tag {
        text-align: center;
        color: #999;
        font-size: 20px;
        position: relative;
        top: -20px;
      }
    }

    .body {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      padding: 0 65px 30px;
    }
  }
}
</style>

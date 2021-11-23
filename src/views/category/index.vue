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
        <li v-for='i in 8' :key='i'>
          <a href='javascript:;'>
            <img src='http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/img/category%20(9).png'>
            <p>空调</p>
          </a>
        </li>
      </ul>
    </div>
    <!-- 不同分类商品 -->
    <div class="ref-goods">
      <div class="head">
        <h3>- 海鲜 -</h3>
        <p class="tag">温暖柔软，品质之选</p>
        <CMore />
      </div>
      <div class="body">
        <GoodsItem v-for="i in 5" :key="i" />
      </div>
    </div>
  </div>
</template>

<script>
import { onUnmounted, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import CBread from '@/components/library/c-bread'
import CBreadItem from '@/components/library/c-bread-item'
import { useStore } from 'vuex'
import HomeBanner from '@/views/home/components/home-banner'
import GoodsItem from '@/views/category/components/goods-item'
import CMore from '@/components/library/c-more'

export default {
  name: 'category-page',
  // eslint-disable-next-line vue/no-unused-components
  components: { CMore, GoodsItem, HomeBanner, CBreadItem, CBread },
  setup() {
    const route = useRoute()
    const store = useStore()
    const categoryName = ref('')
    const stop = watchEffect(() => {
      if (route.name !== 'category') return
      const { id } = route.params
      const routeData = store.state.category.list.filter(item => item.id === id)[0]
      routeData && (categoryName.value = routeData.name)
    })
    onUnmounted(() => {
      stop()
    })
    return { categoryName }
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

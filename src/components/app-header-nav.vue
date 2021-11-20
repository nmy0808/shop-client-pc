<template>
  <ul class="navs">
    <li class="home">
      <RouterLink to="/">首页</RouterLink>
    </li>
    <li v-for="item in categoryList" :key="item.id" @mouseenter="handleShow(item)" @mouseleave="handleHide(item)">
      <router-link :to="`/category/${item.id}`"
                   @click="handleHide(item)">{{ item.name }}
      </router-link>
      <div class="layer" v-if="item.children" :class="{open : item.open}">
        <ul>
          <li v-for="nav in item.children" :key="nav.id">
            <router-link :to="`/category/sub/${nav.id}`" @click="handleHide(item)">
              <img :src="nav.picture" alt="">
              <p>{{ nav.name }}</p>
            </router-link>
          </li>
        </ul>
      </div>
    </li>
  </ul>
</template>

<script>
import { useStore } from 'vuex'
import { computed, nextTick } from 'vue'

export default {
  name: 'app-header-nav',
  setup () {
    const store = useStore()
    const categoryList = computed(() => store.state.category.list)
    const handleHide = (target) => {
      store.commit('category/setNavState', {
        target,
        show: false
      })
    }
    const handleShow = (target) => {
      store.commit('category/setNavState', {
        target,
        show: true
      })
    }
    return {
      categoryList,
      handleHide,
      handleShow
    }
  }
}
</script>

<style scoped lang="less">
.navs {
  width: 820px;
  display: flex;
  justify-content: space-around;
  padding-left: 40px;
  height: 132px;
  align-items: center;

  > li {
    margin-right: 40px;
    width: 38px;
    text-align: center;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    > a {
      font-size: 16px;
      line-height: 32px;
      height: 32px;
      display: inline-block;
    }

    &:hover {
      > a {
        color: @mainColor;
        border-bottom: 1px solid @mainColor;
      }
    }
  }
}

.layer {

  &.open {
    opacity: 1;
    min-height: 150px;
  }

  width: 1240px;
  background-color: #fff;
  position: absolute;
  left: 0px;
  top: 90%;
  height: 0;
  overflow: hidden;
  opacity: 0;
  box-shadow: 0 0 5px #ccc;
  transition: all .2s .1s;
  z-index: 100;
  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 70px;
    align-items: center;
    height: 132px;

    li {
      width: 110px;
      text-align: center;

      img {
        width: 60px;
        height: 60px;
      }

      p {
        padding-top: 10px;
      }

      &:hover {
        p {
          color: @mainColor;
        }
      }
    }
  }
}
</style>

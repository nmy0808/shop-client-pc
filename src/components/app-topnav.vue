<template>
  <nav class='app-topnav'>
    <div class='container'>
      <ul>
        <template v-if='proFile.token'>
          <li><a href='javascript:;'><i class='iconfont icon-user'></i>{{ proFile.account }}</a></li>
          <li><a href='javascript:;' @click='handleLogout'>退出登录</a></li>
        </template>
        <template v-else>
          <li>
            <router-link to='/login'>请先登录</router-link>
          </li>
          <li><a href='javascript:;'>免费注册</a></li>
        </template>
        <li>
          <router-link :to='{name: "member-home"}'>我的订单</router-link>
        </li>
        <li><a href='javascript:;'>会员中心</a></li>
        <li><a href='javascript:;'>帮助中心</a></li>
        <li><a href='javascript:;'>关于我们</a></li>
        <li><a href='javascript:;'><i class='iconfont icon-phone'></i>手机版</a></li>
      </ul>
    </div>
  </nav>
</template>
<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import message from '@/components/library/message'

export default {
  name: 'AppTopnav',
  setup() {
    const store = useStore()
    const router = useRouter()
    const proFile = computed(() => store.state.user.profile)
    const handleLogout = () => {
      store.commit('user/setUser', {})
      router.push({ name: 'login' })
      store.commit('cart/setCart', [])
      message.success({ text: '成功退出' })
    }
    return { proFile, handleLogout }
  }
}
</script>
<style scoped lang='less'>
.app-topnav {
  background: #333;

  ul {
    display: flex;
    height: 53px;
    justify-content: flex-end;
    align-items: center;

    li {
      a {
        padding: 0 15px;
        color: #cdcdcd;
        line-height: 1;
        display: inline-block;

        i {
          font-size: 14px;
          margin-right: 2px;
        }

        &:hover {
          color: @mainColor;
        }
      }

      ~ li {
        a {
          border-left: 2px solid #666;
        }
      }
    }
  }
}
</style>

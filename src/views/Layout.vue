<template>
  <app-topnav></app-topnav>
  <app-header></app-header>
  <main class="header">
    <router-view></router-view>
  </main>
  <app-footer></app-footer>
  <app-header-sticky></app-header-sticky>
</template>

<script>
import AppTopnav from '@/components/app-topnav'
import AppHeader from '@/components/app-header'
import { useStore } from 'vuex'
import AppHeaderSticky from '@/components/app-header-sticky'
import AppFooter from '@/components/app-footer'

export default {
  name: 'layout',
  components: {
    AppFooter,
    AppHeaderSticky,
    AppHeader,
    AppTopnav
  },
  setup () {
    const store = useStore()
    store.dispatch('category/getCategory')
    return {}
  }
}
</script>

<style scoped>
.footer{
}
</style>

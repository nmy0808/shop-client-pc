<template>
  <app-topnav></app-topnav>
  <app-header></app-header>
  <header class="header">2</header>
  <main class="header">
    <router-view></router-view>
  </main>
  <footer class="footer">3</footer>
</template>

<script>
import AppTopnav from '@/components/app-topnav'
import AppHeader from '@/components/app-header'
import { useStore } from 'vuex'

export default {
  name: 'layout',
  components: {
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

</style>

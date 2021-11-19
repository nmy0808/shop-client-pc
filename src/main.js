import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

createApp(App).use(store).use(router).mount('#app')

const str = encodeURIComponent('/123?aa=32')
console.log(decodeURIComponent(str))

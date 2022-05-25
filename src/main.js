import { createApp } from 'vue'
import App from './App.vue'
import common from './assets/js/common'

const app = createApp(App)
app.use(common)
app.mount('#app')
import App from './App.vue'
import router from "./router"
import store from './store'
import ToastPlugin from './plugins/toast'
import "components/common"
import VueAwesomeSwiper from 'vue-awesome-swiper'
import VueLazyLoad from 'vue-lazyload'
// require styles
import 'swiper/dist/css/swiper.css'

Vue.use(VueLazyLoad,{
  loading:require('assets/img/common/placeholder.png'),//配置占位图片
})
Vue.prototype.$bus=new Vue()
Vue.use(VueAwesomeSwiper, /* { default global options } */)

Vue.use(ToastPlugin)


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')


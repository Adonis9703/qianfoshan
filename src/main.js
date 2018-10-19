// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Clipboard from 'clipboard'

import {logger, cache, post, api, date, validate, common} from '@/utils'
import '@/assets/sass/sass-index.scss'

import {
  Toast,
  Button,
  Icon,
  Area,
  Popup,
} from 'vant'

Toast.setDefaultOptions({
})

Vue.use(Toast)
Vue.use(Button)
Vue.use(Area);
Vue.use(Icon);
Vue.use(Popup)

Vue.config.productionTip = false

Vue.prototype.$log = logger.log
Vue.prototype.$cache = cache
Vue.prototype.$post = post
Vue.prototype.$api = api
Vue.prototype.$date = date
Vue.prototype.$validate = validate
Vue.prototype.$common = common
Vue.prototype.$toast = Toast

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})

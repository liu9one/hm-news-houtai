import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './styles/base.scss'
import './utils/element'
import './utils/request'
import moment from 'moment'
import vueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme

Vue.use(vueQuillEditor)

Vue.filter('time', input => {
  return moment(input).format('YYYY-MM-DD')
})
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

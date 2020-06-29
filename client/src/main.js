import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Buefy from 'buefy'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHeadphones, faPlayCircle, faPauseCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import VueMoment from 'vue-moment'
import store from './store'

library.add(faHeadphones)
library.add(faPlayCircle)
library.add(faPauseCircle)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false
Vue.use(Buefy)
Vue.use(VueMoment)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

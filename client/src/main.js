import Vue from 'vue'
import Buefy from 'buefy'
import VueMoment from 'vue-moment'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import router from './router'
import store from './store'
import titleMixin from './mixins/title'

import App from './App.vue'

Vue.config.productionTip = false

library.add(fas)

Vue.use(Buefy, {
    defaultIconComponent: FontAwesomeIcon,
    defaultIconPack: 'fas'
})

Vue.mixin(titleMixin)

Vue.use(VueMoment)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

import Vue from 'vue'
import App from './Test/index.vue'
import ElementUI from 'element-ui';

import 'element-ui/lib/theme-chalk/index.css';
import Vuex from 'vuex'
import createStore from './eva/index';
import effectPlugin from './eva-model';

Vue.use(Vuex)
Vue.config.productionTip = false
Vue.use(ElementUI);


const mds = require.context('./', true, /model\.js$/)

const models = mds.keys().map((key) => mds(key).default);

const store = createStore({ 
  store: new Vuex.Store(), 
  models,
  onEffect: [effectPlugin]
})

new Vue({
  render: h => h(App),
  store
}).$mount('#app')

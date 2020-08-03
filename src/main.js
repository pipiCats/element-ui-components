import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Vuex from 'vuex'
import createStore from './eva/index';

Vue.use(Vuex)
Vue.config.productionTip = false
Vue.use(ElementUI);

const mds = require.context('./', true, /model\.js$/)

const models = mds.keys().map((key) => mds(key).default);

const store = createStore({ store: new Vuex.Store(), models })

new Vue({
  render: h => h(App),
  store
}).$mount('#app')

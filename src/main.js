import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
import ElementUI from 'element-ui'
Vue.use(ElementUI, { size: 'mini'});
import('element-ui/lib/theme-chalk/index.css')

import './components/iconSvg' 

import '@/permission' // permission control

import '@/mockjs'; // mock数据

// i18n国际化
import i18n from "@/lang";


new Vue({
  router,
  store,
  i18n,  
  render: h => h(App),
}).$mount('#app')

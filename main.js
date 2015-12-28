import Vue from 'vue'
import App from './components/App.vue'

Vue.filter('hasKeyword', value => {
  return true;
});

Vue.filter('hasTag', value => {
  return true;
});


new Vue({
  el: 'body',
  components: { App }
});

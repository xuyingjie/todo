import Vue from 'vue'
import App from './components/App.vue'

Vue.filter('hasKeyword', (str, keyword) => {
  if (str.match(keyword)) {
    return true;
  } else {
    return false;
  }
});


new Vue({
  el: 'body',
  components: { App }
});

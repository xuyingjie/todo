import Vue from 'vue'
import App from './components/App.vue'
import Join from './components/Join.vue'

var app = new Vue({
  el: 'body',
  data: {
    currentView: 'App'
  },
  components: { App, Join }
});


// router
function hashChange() {
  let hash = location.hash.split('/');
  if (hash[1] === 'join') {
    app.currentView = 'Join';
  } else {
    app.currentView = 'App';
  }
}

hashChange();
window.onhashchange = hashChange;

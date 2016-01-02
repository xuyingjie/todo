#### Design: http://xuyingjie.github.io/todo/

### Vue.js

```javascript
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
```

```javascript
<partial :name="content"></partial>
...
Vue.partial(this.item.id, c);
this.content = this.item.id;
```

```javascript
let reg = new RegExp('!\\[.*?,.*?,.*?,' + key + ']');
let out = [...this.todo];
out = out.map(el => {
  if (el.content.match(reg)) {
    let item = Object.assign({}, el);
    item.content = item.content.replace(reg, '');
    item.lastChange = new Date().toString();
    return item;
  } else {
    return el;
  }
});
```



### CSS

```css
nav {
  display: flex;
  /*eg: flex-direction: row | row-reverse | column | column-reverse; */
  /*flex-direction: row;*/
  /*eg: flex-wrap: nowrap | wrap | wrap-reverse; */
  /*flex-wrap: nowrap;*/
  /*eg: flex-flow: <flex-direction> || <flex-wrap>; */
  flex-flow: row nowrap;
  /*eg: justify-content: flex-start | flex-end | center | space-between | space-around; */
  justify-content: flex-end;
  /*eg: align-items: flex-start | flex-end | center | baseline | stretch; */
  align-items: stretch;
  /*eg: align-content: flex-start | flex-end | center | space-between | space-around | stretch; */
  align-content: stretch;
}
.item {
  /*eg: order: <integer>; */
  order: 0;
  /*eg: flex-grow: <number>; */
  /*flex-grow: 0;*/
  /*eg: flex-shrink: <number>; */
  /*flex-shrink: 1;*/
  /*eg: flex-basis: <length> | auto; */
  /*flex-basis: auto;*/
  /*eg: flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ] */
  flex: 1 0 auto;
  /*eg: align-self: auto | flex-start | flex-end | center | baseline | stretch; */
  align-self: auto;
}
```

```css
@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translate3d(0, -100%, 0);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
.fade-enter {
  animation: fadeInDown .5s;
}
```

import Vue from 'vue';

const contexts = require.context('.', false, /\.vue$/);

contexts.keys().forEach((component) => {
  const componentEnity = contexts(component).default;
  Vue.component(componentEnity.name, componentEnity);
});

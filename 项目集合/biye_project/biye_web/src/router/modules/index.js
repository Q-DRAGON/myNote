const contexts = require.context('.', true, /\.js$/);

let configRouters = [];


contexts.keys().forEach((fs) => {
  if (fs === './index.js') return;
  configRouters = configRouters.concat(contexts(fs).default)
});


export default configRouters;

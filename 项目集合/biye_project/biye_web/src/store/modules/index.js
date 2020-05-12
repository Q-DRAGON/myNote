const contexts = require.context('.', true, /index\.js$/);
const modules = {};
contexts.keys().forEach((key) => {
  if (key === './index.js' || key === './global/index.js') {
    return;
  }
  const regArr = key.match(/\.\/(.*)\//);
  modules[regArr[1]] = contexts(key).default;
});

export default modules;

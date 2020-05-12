const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');
const srcRoot = path.resolve(__dirname, 'src');
const devPath = path.resolve(__dirname, 'dev');
const pageDir = path.resolve(srcRoot, 'page');
const mainFile = 'index.js';

function getHtmlArray(entryMap) {
    let htmlArray = [];
    Object.keys(entryMap).forEach(key => {
        let fullPathName = path.resolve(pageDir, key);
        let fileName = path.resolve(fullPathName, key + '.html');

        if (fs.existsSync(fileName)) {
            htmlArray.push(new HtmlWebpackPlugin({
                filename: key + '.html',
                template: fileName,
                // chunk指的是template中引入的js文件
                chunk: [key],
            }))
        }
    })
    return htmlArray;
}

function getEntry(){
    let entryMap = {};
    fs.readdirSync(pageDir).forEach((pathname)=>{
        let fullPathName = path.resolve(pageDir, pathname);
        // 判断是路径还是文件
        let stat = fs.statSync(fullPathName);
        let fileName = path.resolve(fullPathName, mainFile);
        // fs.existsSync 判断当期文件是否存在
        if (stat.isDirectory() && fs.existsSync(fileName)) {
            entryMap[pathname] = fileName;
        }
    });
    return entryMap;
}

const entryMap = getEntry();
const htmlArray = getHtmlArray(entryMap);
// console.log('html', htmlArray);

module.exports = {
  mode: 'development',
  entry: entryMap,
  output: {
    path: devPath,
    filename: '[name].min.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        include: srcRoot,
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
        include: srcRoot,
      },
      {
        test: /\.(png|jpg|jpeg)$/,
        use: ['url-loader?limit=8192'],
        include: srcRoot,
      },
      {
          test: /\.(js|jsx)$/,
          use: [{loader: 'babel-loader'}],
          include: srcRoot,
      }
    ],
  },
  //   定制化 {pathName}.js 对应的{pathName}.html的配置。
  plugins: [].concat(htmlArray)
}


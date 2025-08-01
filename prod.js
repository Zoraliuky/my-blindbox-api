'use strict';
require('@midwayjs/koa');

const { Bootstrap } = require('@midwayjs/bootstrap');

Bootstrap.configure({
  // __dirname 指向当前文件所在的目录，也就是打包后的根目录
  appDir: __dirname,
  // 明确告诉 Bootstrap 去加载 dist 目录下的 configuration.js 文件
  imports: require('./dist/configuration'),
}).run();

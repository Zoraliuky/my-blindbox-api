'use strict';
const koaFramework = require('@midwayjs/koa');
const { Bootstrap } = require('@midwayjs/bootstrap');


Bootstrap.configure({
  appDir: __dirname,
  framework: koaFramework,
  imports: require('./dist/configuration'),

}).run();

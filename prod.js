'use strict';
const koa = require('@midwayjs/koa');
const { Bootstrap } = require('@midwayjs/bootstrap');
Bootstrap.configure({
  appDir: __dirname,
  framework: koa,
}).run();

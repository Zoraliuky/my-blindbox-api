import { Configuration, App } from '@midwayjs/core';
import * as koa from '@midwayjs/koa';
import * as validate from '@midwayjs/validate';
import * as info from '@midwayjs/info';
import { join } from 'path';
import * as typeorm from '@midwayjs/typeorm';
import * as crossDomain from '@midwayjs/cross-domain';

@Configuration({
  // 这个配置告诉 MidwayJS 去扫描 src/config 文件夹来加载配置
  importConfigs: [join(__dirname, './config')],

  // 这里只加载开发时需要的组件
  imports: [
    koa,
    validate,
    {
      component: info,
      enabledEnvironment: ['local'],
    },
    typeorm,
    crossDomain,
  ],
})
export class MainConfiguration {
  @App()
  app: koa.Application;

  async onReady() {
    // ...
  }
}


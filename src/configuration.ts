import { Configuration, App } from '@midwayjs/core';
import * as koa from '@midwayjs/koa';
import * as validate from '@midwayjs/validate';
import * as info from '@midwayjs/info';
import { join } from 'path';
import * as typeorm from '@midwayjs/typeorm';
import * as crossDomain from '@midwayjs/cross-domain';
import * as staticFile from '@midwayjs/static-file';

@Configuration({
  // importConfigs 的作用是告诉 MidwayJS 去扫描哪个文件夹来加载配置
  // 这在开发环境和经典部署模式下是最佳实践
  importConfigs: [join(__dirname, './config')],

  imports: [
    koa,
    validate,
    {
      component: info,
      enabledEnvironment: ['local'],
    },
    typeorm,
    crossDomain,
    staticFile,
  ],
})
export class MainConfiguration {
  @App()
  app: koa.Application;

  async onReady() {
    // ...
  }
}

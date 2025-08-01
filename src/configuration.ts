import { Configuration, App } from '@midwayjs/core';
import * as koa from '@midwayjs/koa';
import * as validate from '@midwayjs/validate';
import * as info from '@midwayjs/info';
import * as typeorm from '@midwayjs/typeorm';
import * as crossDomain from '@midwayjs/cross-domain';
import * as staticFile from '@midwayjs/static-file';

// 1. 直接导入我们的配置文件
import defaultConfig from './config/config.default';
import prodConfig from './config/config.prod';

@Configuration({
  // 2. 将导入的配置对象直接放在这里
  //    这种方式不再依赖于文件系统扫描，打包后也能正常工作
  importConfigs: [
    {
      default: defaultConfig,
      prod: prodConfig,
    }
  ],
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

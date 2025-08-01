import { Controller, Get, Inject, ContentType } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import * as fs from 'fs';
import { join } from 'path';

@Controller('/')
export class ViewController {
  @Inject()
  ctx: Context;

  /**
   * 通配符路由 - 捕获所有未匹配的GET请求
   * @Get('/*') 这个装饰器是关键，星号 * 是一个通配符。
   * 它会匹配 /、/login、/box/123 等所有路径。
   */
  @Get('/*')
  @ContentType('text/html') // 告诉浏览器我们返回的是HTML内容
  async renderFrontend() {
    try {
      // 读取打包后 public 文件夹中的 index.html 文件内容
      const html = fs.readFileSync(
        join(__dirname, '../../public/index.html'),
        'utf-8'
      );
      return html;
    } catch (error) {
      this.ctx.status = 404;
      return 'Frontend entry file not found. Did you build the frontend?';
    }
  }
}

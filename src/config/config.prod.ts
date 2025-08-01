import { MidwayConfig } from '@midwayjs/core';
import { join } from 'path';

export default {
  // 静态文件托管配置，这个配置只在生产环境 (打包后运行) 生效
  staticFile: {
    dirs: {
      default: {
        prefix: '/',
        dir: join(__dirname, '../../public'), // 指向打包后根目录的 public 文件夹
      },
    },
  },
} as MidwayConfig;

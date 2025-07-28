import { MidwayConfig } from '@midwayjs/core';
import { User } from '../entity/user.entity';

export default {
  // 数据库配置
  typeorm: {
    dataSource: {
      default: {
        type: 'sqlite',
        database: 'webapp.sqlite',
        synchronize: true,
        logging: true,
        entities: [User], // 确保这里有指定实体
      },
    },
  },

  // Cookie 签名密钥
  keys: 'lkyjsdmn_zytjsdcz_lkyhzytsybzdhpy', // 您的密钥

  // 服务器端口
  koa: {
    port: 7001,
  },
} as MidwayConfig;

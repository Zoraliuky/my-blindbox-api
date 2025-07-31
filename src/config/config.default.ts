import { MidwayConfig } from '@midwayjs/core';
import { User } from '../entity/user.entity';
import { BlindBox } from '../entity/blind-box.entity';
import { Order } from '../entity/order.entity';
import { Comment } from '../entity/comment.entity'; // 导入 Comment

export default {
  typeorm: {
    dataSource: {
      default: {
        type: 'sqlite',
        database: 'webapp.sqlite',
        synchronize: true,
        logging: true,
        entities: [User, BlindBox, Order,Comment],
      },
    },
  },

  // 跨域(CORS)详细配置
  crossDomain: {
    origin: '*', // 允许所有来源的请求，用于开发和测试
    allowHeaders: 'Content-Type,Authorization,X-Requested-With',
    allowMethods: 'GET,POST,PUT,DELETE,OPTIONS',
  },

  // Cookie 签名密钥
  keys: 'lkyjsdmn_zytjsdcz_lkyhzytsybzdhpy',

  // 服务器端口
  koa: {
    port: 7001,
  },
} as MidwayConfig;

import { MidwayConfig } from '@midwayjs/core';
import { User } from '../entity/user.entity';
import { BlindBox } from '../entity/blind-box.entity';
import { Order } from '../entity/order.entity';
import { Comment } from '../entity/comment.entity';

export default {
  // 数据库配置
  typeorm: {
    dataSource: {
      default: {
        type: 'sqlite',
        database: 'webapp.sqlite',
        synchronize: true,
        logging: true,
        entities: [User, BlindBox, Order, Comment],
      },
    },
  },

  // 跨域(CORS)配置
  crossDomain: {
    origin: '*',
  },

  // Cookie 签名密钥
  keys: 'lkyjsdmn_zytjsdcz_lkyhzytsybzdhpy',

  // 服务器端口
  koa: {
    port: 7001,
  },
} as MidwayConfig;

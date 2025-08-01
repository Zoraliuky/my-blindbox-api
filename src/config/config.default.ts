import { MidwayConfig } from '@midwayjs/core';
import { User } from '../entity/user.entity';
import { BlindBox } from '../entity/blind-box.entity';
import { Order } from '../entity/order.entity';
import { Comment } from '../entity/comment.entity'; // 导入 Comment
import { join} from 'path';
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
  staticFile: {
    dirs: {
      default: {
        prefix: '/', // 访问前缀，'/' 表示根路径
        dir: join(__dirname, '../../public'), // 指向打包后根目录的 public 文件夹
      },
    },
  },
} as MidwayConfig;

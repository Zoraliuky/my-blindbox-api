import { MidwayConfig } from '@midwayjs/core';

export default {
  // use for cookie sign key, should change to your own and keep security
  typeorm: {
    dataSource: {
      default: {
        type: 'sqlite',
        database: 'webapp.sqlite',
        synchronize: true,
        logging: true,
      },
    },
  },
  keys: 'lkyjsdmn_zytjsdcz_lkyhzytsybzdhpy',
  koa: {
    port: 7001,
  },
} as MidwayConfig;

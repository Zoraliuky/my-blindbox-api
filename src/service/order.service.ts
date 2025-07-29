    import { Provide } from '@midwayjs/core';
    import { InjectEntityModel } from '@midwayjs/typeorm';
    import { Repository } from 'typeorm';
    import { Order } from '../entity/order.entity';

    @Provide()
    export class OrderService {
      @InjectEntityModel(Order)
      orderModel: Repository<Order>;

      // 创建订单 (即 "抽盒" 动作)
      async createOrder(userId: number, blindBoxId: number) {
        const order = this.orderModel.create({ userId, blindBoxId });
        return await this.orderModel.save(order);
      }

      // 根据用户ID查找所有订单
      async findOrdersByUserId(userId: number) {
        return await this.orderModel.find({
          where: { userId },
          // 同时加载关联的盲盒信息
          relations: ['blindBox'],
          order: { createTime: 'DESC' }, // 按创建时间降序排序
        });
      }
    }
    
    import { Inject, Controller, Post, Get, Body, Query } from '@midwayjs/core';
    import { OrderService } from '../service/order.service';

    @Controller('/api/order')
    export class OrderController {
      @Inject()
      orderService: OrderService;

      // 抽盒接口
      @Post('/draw')
      async drawBlindBox(@Body() dto: { userId: number; blindBoxId: number }) {
        // 注意：在真实项目中，userId 应该从登录状态中获取，而不是由前端传递，以确保安全。
        // 这里为了测试方便，我们暂时从请求体中获取。
        return await this.orderService.createOrder(dto.userId, dto.blindBoxId);
      }

      // 查询用户订单列表接口
      @Get('/')
      async getUserOrders(@Query('userId') userId: number) {
        // 同样，userId 应该从登录状态获取。
        return await this.orderService.findOrdersByUserId(userId);
      }
    }
    
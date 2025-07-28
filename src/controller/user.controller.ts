import { Inject, Controller, Post, Body } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { UserService } from '../service/user.service';
import { CreateUserDTO } from '../dto/user.dto';

/**
 * 负责处理所有与用户相关的HTTP请求
 */
@Controller('/api/user')
export class UserController {
  /**
   * Context 是 MidwayJS 对当前请求上下文的封装，通过它来设置响应的状态码等。
   */
  @Inject()
  ctx: Context;
  /**
   *注入之前编写的 UserService，以便调用其中的业务逻辑方法。
   */
  @Inject()
  userService: UserService;

  /**
   * @Post('/register') 装饰器表示这个方法用来处理指向 '/api/user/register' 的 POST 请求。
   */
  @Post('/register')
  async createUser(@Body() userDTO: CreateUserDTO) {
    try {
      const createdUser = await this.userService.createUser(userDTO);
      // 设置 HTTP 状态码为 201 (Created)，表示资源创建成功
      this.ctx.status = 201;
      return { success: true, message: '注册成功', data: createdUser };
    } catch (error) {
      // 如果 Service 层抛出错误 (例如用户名已存在)，捕获它
      this.ctx.status = 409; // 409 Conflict 表示请求冲突
      return { success: false, message: error.message };
    }
  }

  /**
   * @Post('/login') 装饰器表示这个方法用来处理指向 '/api/user/login' 的 POST 请求。
   */
  @Post('/login')
  async login(@Body() loginInfo: { username: string; password: string }) {
    const user = await this.userService.validateUser(
      loginInfo.username,
      loginInfo.password
    );

    if (user) {
      // 登录成功
      return { success: true, message: '登录成功', data: user };
    } else {
      // 登录失败
      this.ctx.status = 401; // 401 Unauthorized 表示未经授权
      return { success: false, message: '用户名或密码错误' };
    }
  }
}

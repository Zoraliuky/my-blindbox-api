import { Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { CreateUserDTO } from '../dto/user.dto';
import * as bcrypt from 'bcryptjs';

/**
 * 用户服务 - 处理所有与用户相关的业务逻辑
 */
@Provide()
export class UserService {
  /**
   * 注入 User 实体对应的数据库模型
   */
  @InjectEntityModel(User)
  userModel: Repository<User>;

  /**
   * 创建新用户 (用于注册)
   * @param userDTO - 包含新用户信息的数据传输对象
   * @returns 创建成功后的用户信息 (不含密码)
   */
  async createUser(userDTO: CreateUserDTO): Promise<User> {
    // 1. 检查用户名或邮箱是否已存在
    const existingUser = await this.userModel.findOne({
      where: [{ username: userDTO.username }, { email: userDTO.email }],
    });

    if (existingUser) {
      // 如果用户已存在，抛出错误
      throw new Error('用户名或邮箱已被注册');
    }

    // 2. 对密码进行哈希加密
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(userDTO.password, salt);

    // 3. 创建一个新的 User 实例
    const newUser = new User();
    newUser.username = userDTO.username;
    newUser.password = hashedPassword;
    newUser.email = userDTO.email;
    newUser.nickname = userDTO.nickname || userDTO.username;

    // 4. 将新用户数据保存到数据库
    const savedUser = await this.userModel.save(newUser);

    // 5. 从返回给上层的数据中移除密码字段，确保安全
    delete savedUser.password;
    return savedUser;
  }

  /**
   * 验证用户信息 (用于登录)
   * @param username - 用户名
   * @param password - 原始密码
   * @returns 验证成功则返回用户信息 (不含密码)，否则返回 null
   */
  async validateUser(username: string, password: string): Promise<User | null> {
    // 1. 根据用户名查找用户
    const user = await this.userModel.findOne({
      where: { username },
      select: ['id', 'username', 'password', 'email', 'nickname'],
    });

    // 2. 如果用户不存在，或密码不匹配，则验证失败
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return null;
    }

    // 3. 验证成功，从返回结果中删除密码字段
    delete user.password;
    return user;
  }
}

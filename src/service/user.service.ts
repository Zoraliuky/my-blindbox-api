/*import { Provide } from '@midwayjs/core';
import { IUserOptions } from '../interface';

@Provide()
export class UserService {
  async getUser(options: IUserOptions) {
    return {
      uid: options.uid,
      username: 'mockedName',
      phone: '12345678901',
      email: 'xxx.xxx@xxx.com',
    };
  }
}*/
import { Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { CreateUserDTO } from '../dto/user.dto';
import * as bcrypt from 'bcryptjs';

@Provide()
export class UserService {
  /**
   * @InjectEntityModel(User) 装饰器会自动将 User 实体的 Repository (仓库) 注入到 this.userModel 属性中。
   */
  @InjectEntityModel(User)
  userModel: Repository<User>;

  /**
   * 创建新用户
   * @param userDTO 包含新用户信息的数据传输对象
   * @returns 创建成功后的用户信息
   */
  async createUser(userDTO: CreateUserDTO): Promise<User> {
    //  检查用户名或邮箱是否已存在
    const existingUser = await this.userModel.findOne({
      where: [{ username: userDTO.username }, { email: userDTO.email }],
    });

    if (existingUser) {
      // 如果用户已存在
      throw new Error('用户名或邮箱已被注册');
    }

    //  对密码加密
    // bcrypt.genSaltSync(10) 生成一个“盐”，增加密码破解难度WWWWWWbudong
    // bcrypt.hashSync 用生成的盐来加密密码WWWWWWWWWWW
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(userDTO.password, salt);

    // 创建一个新的 User 实例
    const newUser = new User();
    newUser.username = userDTO.username;
    newUser.password = hashedPassword; // 存储加密后的密码
    newUser.email = userDTO.email;
    newUser.nickname = userDTO.nickname || userDTO.username; // 如果没提供昵称，默认使用用户名

    // 将新用户数据保存到数据库
    const savedUser = await this.userModel.save(newUser);

    // 从返回给上层的数据中移除密码字段，确保安全
    delete savedUser.password;
    return savedUser;
  }

  /**
   * 验证用户信息
   * @param username 用户名
   * @param password 原始密码
   * @returns 验证成功则返回用户信息 (不含密码)，否则返回 null
   */
  async validateUser(username: string, password: string): Promise<User | null> {
    // 根据用户名查找用户
    const user = await this.userModel.findOne({
      where: { username },
      select: ['id', 'username', 'password', 'email', 'nickname'], // 明确指定需要查询的字段
    });

    // 如果用户不存在，或密码不匹配，则验证失败
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return null;
    }

    // 验证成功，从返回结果中删除密码字段
    delete user.password;
    return user;
  }
}


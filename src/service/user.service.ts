import { Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { CreateUserDTO } from '../dto/user.dto';
import * as bcrypt from 'bcryptjs';

@Provide()
export class UserService {
  @InjectEntityModel(User)
  userModel: Repository<User>;

  async createUser(userDTO: CreateUserDTO): Promise<User> {
    const existingUser = await this.userModel.findOne({
      where: [{ username: userDTO.username }, { email: userDTO.email }],
    });

    if (existingUser) {
      throw new Error('用户名或邮箱已被注册');
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(userDTO.password, salt);

    const newUser = new User();
    newUser.username = userDTO.username;
    newUser.password = hashedPassword;
    newUser.email = userDTO.email;
    newUser.nickname = userDTO.nickname || userDTO.username;
    // role 字段有默认值 'user'，所以这里不需要设置

    const savedUser = await this.userModel.save(newUser);

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
      // 2. 【关键修复】
      //    在 select 数组中，加入 'role' 字段。
      //    这样 TypeORM 就会在查询数据库时，把 role 信息也一并取出来。
      select: ['id', 'username', 'password', 'email', 'nickname', 'role'],
    });

    // 3. 如果用户不存在，或密码不匹配，则验证失败
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return null;
    }

    // 4. 验证成功，从返回结果中删除密码字段
    delete user.password;
    return user;
  }
}

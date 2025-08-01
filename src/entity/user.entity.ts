    import {
      Entity,
      PrimaryGeneratedColumn,
      Column,
      CreateDateColumn,
      UpdateDateColumn,
    } from 'typeorm';

    // 定义一个用户角色的类型，只能是 'admin' 或 'user'
    export type UserRole = 'admin' | 'user';

    /**
     * 用户实体 - 对应数据库中的 'user' 表
     */
    @Entity('user')
    export class User {
      @PrimaryGeneratedColumn()
      id: number;

      @Column({ unique: true, length: 50 })
      username: string;

      @Column({ length: 255 })
      password: string;

      @Column({ unique: true })
      email: string;

      @Column({ nullable: true, length: 50 })
      nickname: string;

      /**
       * 新增：用户角色字段
       * type: 'simple-enum' 表示这是一个简单的枚举类型
       * enum: ['admin', 'user'] 限定了这个字段的值只能是这两者之一
       * default: 'user' 表示新注册的用户，默认身份是普通用户
       */
      @Column({
        type: 'simple-enum',
        enum: ['admin', 'user'] as UserRole[],
        default: 'user',
      })
      role: UserRole;

      /**
       * 记录创建时间
       * @CreateDateColumn 装饰器会让TypeORM在插入新记录时，
       * 自动将当前时间填充到这个字段。
       */
      @CreateDateColumn()
      createTime: Date;

      /**
       * 记录更新时间
       * @UpdateDateColumn 装饰器会让TypeORM在每次更新记录时，
       * 自动将当前时间更新到这个字段。
       */
      @UpdateDateColumn()
      updateTime: Date;
    }
    
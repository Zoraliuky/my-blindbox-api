import{
    Entity,
    PrimaryGeneratedColumn,
    Column,
}from 'typeorm';
@Entity('user')
export class User{
    /**
   * ID
   * @PrimaryGeneratedColumn 装饰器表示这是一个自增主键列。
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * 用户名
   * @Column 装饰器表示这是一个普通的数据库列。
   */
  @Column({ unique: true, length: 50 })
  username: string;

  /**
   * 密码
   */
  @Column({ length: 255 })
  password: string;

  /**
   * 电子邮箱
   */
  @Column({ unique: true })
  email: string;

  /**
   * 用户昵称
   * 用户可以不设置昵称。
   */
  @Column({ nullable: true, length: 50 })
  nickname: string;
}
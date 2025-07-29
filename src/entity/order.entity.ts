    import {
      Entity,
      PrimaryGeneratedColumn,
      Column,
      CreateDateColumn,
      ManyToOne,
    } from 'typeorm';
    import { User } from './user.entity';
    import { BlindBox } from './blind-box.entity';

    @Entity('order')
    export class Order {
      @PrimaryGeneratedColumn()
      id: number;

      // 关联到用户ID
      @Column()
      userId: number;

      // 关联到盲盒ID
      @Column()
      blindBoxId: number;

      @CreateDateColumn()
      createTime: Date;

      // 多对一关系：多个订单可以属于一个用户
      @ManyToOne(() => User, user => user.id)
      user: User;

      // 多对一关系：多个订单可以指向同一个盲盒商品
      @ManyToOne(() => BlindBox, blindBox => blindBox.id)
      blindBox: BlindBox;
    }
    
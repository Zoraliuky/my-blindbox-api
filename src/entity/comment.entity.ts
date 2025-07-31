import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from './user.entity';
import { BlindBox } from './blind-box.entity';

@Entity('comment')
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  content: string;

  @Column()
  userId: number;

  @Column()
  blindBoxId: number;

  @CreateDateColumn()
  createTime: Date;

  // 多个评论可以属于一个用户
  @ManyToOne(() => User, user => user.id)
  user: User;

  // 多个评论可以属于一个盲盒
  @ManyToOne(() => BlindBox, blindBox => blindBox.id, {
    onDelete: 'CASCADE', // 如果盲盒被删除，关联的评论也一并删除
  })
  blindBox: BlindBox;
}
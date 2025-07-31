    import { Provide } from '@midwayjs/core';
    import { InjectEntityModel } from '@midwayjs/typeorm';
    import { Repository } from 'typeorm';
    import { Comment } from '../entity/comment.entity';

    @Provide()
    export class CommentService {
      @InjectEntityModel(Comment)
      commentModel: Repository<Comment>;

      // 根据盲盒ID查找所有评论，并带上用户信息
      async findCommentsByBoxId(blindBoxId: number) {
        return await this.commentModel.find({
          where: { blindBoxId },
          relations: ['user'], // 同时加载关联的用户信息（昵称等）
          order: { createTime: 'DESC' },
        });
      }

      // 创建新评论
      async createComment(userId: number, blindBoxId: number, content: string) {
        const comment = this.commentModel.create({ userId, blindBoxId, content });
        return await this.commentModel.save(comment);
      }
    }
    
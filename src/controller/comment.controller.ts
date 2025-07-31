    import { Inject, Controller, Post, Get, Body, Query } from '@midwayjs/core';
    import { CommentService } from '../service/comment.service';

    @Controller('/api/comment')
    export class CommentController {
      @Inject()
      commentService: CommentService;

      // 获取指定盲盒的评论列表
      @Get('/')
      async getComments(@Query('blindBoxId') blindBoxId: number) {
        return await this.commentService.findCommentsByBoxId(blindBoxId);
      }

      // 发表新评论
      @Post('/')
      async createComment(@Body() dto: { userId: number; blindBoxId: number; content: string }) {
        // 同样，userId 应该从登录状态获取，这里为测试方便
        return await this.commentService.createComment(dto.userId, dto.blindBoxId, dto.content);
      }
    }
    
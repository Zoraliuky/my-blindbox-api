    import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

    /**
     * 盲盒实体 - 对应数据库中的 'blind_box' 表
     */
    @Entity('blind_box')
    export class BlindBox {
      @PrimaryGeneratedColumn()
      id: number;

      @Column({ length: 100 })
      name: string;

      @Column('text', { nullable: true })
      description: string;

      // 使用 'decimal' 类型来精确存储价格
      @Column({ type: 'decimal', precision: 10, scale: 2 })
      price: number;

      @Column({ nullable: true })
      imageUrl: string; // 存储盲盒图片的URL
    }
    
    import { Provide } from '@midwayjs/core';
    import { InjectEntityModel } from '@midwayjs/typeorm';
    import { Repository } from 'typeorm';
    import { BlindBox } from '../entity/blind-box.entity';
    import { CreateBlindBoxDTO } from '../dto/blind-box.dto';

    @Provide()
    export class BlindBoxService {
      @InjectEntityModel(BlindBox)
      blindBoxModel: Repository<BlindBox>;

      // 创建盲盒
      async createBlindBox(dto: CreateBlindBoxDTO) {
        const blindBox = this.blindBoxModel.create(dto);
        return await this.blindBoxModel.save(blindBox);
      }

      // 查找所有盲盒
      async findAllBlindBoxes() {
        return await this.blindBoxModel.find();
      }

      // 查找单个盲盒
      async findBlindBoxById(id: number) {
        return await this.blindBoxModel.findOne({ where: { id } });
      }

      // 更新盲盒信息
      async updateBlindBox(id: number, dto: Partial<CreateBlindBoxDTO>) {
        await this.blindBoxModel.update(id, dto);
        return this.findBlindBoxById(id);
      }

      // 删除盲盒
      async deleteBlindBox(id: number) {
        const result = await this.blindBoxModel.delete(id);
        return result.affected > 0; // 如果影响行数大于0，则删除成功
      }
    }
    
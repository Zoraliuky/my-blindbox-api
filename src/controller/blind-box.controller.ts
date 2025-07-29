    import {
      Inject,
      Controller,
      Post,
      Get,
      Put,
      Del,
      Param,
      Body,
    } from '@midwayjs/core';
    import { BlindBoxService } from '../service/blind-box.service';
    import { CreateBlindBoxDTO } from '../dto/blind-box.dto';

    @Controller('/api/blind-box')
    export class BlindBoxController {
      @Inject()
      blindBoxService: BlindBoxService;

      @Post('/')
      async createBlindBox(@Body() dto: CreateBlindBoxDTO) {
        return await this.blindBoxService.createBlindBox(dto);
      }

      @Get('/')
      async getBlindBoxes() {
        return await this.blindBoxService.findAllBlindBoxes();
      }

      @Get('/:id')
      async getBlindBox(@Param('id') id: number) {
        return await this.blindBoxService.findBlindBoxById(id);
      }

      @Put('/:id')
      async updateBlindBox(
        @Param('id') id: number,
        @Body() dto: Partial<CreateBlindBoxDTO>
      ) {
        return await this.blindBoxService.updateBlindBox(id, dto);
      }

      @Del('/:id')
      async deleteBlindBox(@Param('id') id: number) {
        const success = await this.blindBoxService.deleteBlindBox(id);
        return { success };
      }
    }
    
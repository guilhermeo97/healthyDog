import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateGuideDogDto } from '../../application/dto/create-guide-dog.dto';
import { UpdateGuideDogDto } from '../../application/dto/update-guide-dog.dto';

@Controller('guide-dog')
export class GuideDogController {
  constructor(private readonly guideDogService: GuideDogService) {}

  @Post()
  create(@Body() createGuideDogDto: CreateGuideDogDto) {
    return this.guideDogService.create(createGuideDogDto);
  }

  @Get()
  findAll() {
    return this.guideDogService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.guideDogService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateGuideDogDto: UpdateGuideDogDto,
  ) {
    return this.guideDogService.update(+id, updateGuideDogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.guideDogService.remove(+id);
  }
}

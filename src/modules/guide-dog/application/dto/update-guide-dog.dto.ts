import { PartialType } from '@nestjs/mapped-types';
import { CreateGuideDogDto } from './create-guide-dog.dto';

export class UpdateGuideDogDto extends PartialType(CreateGuideDogDto) {}

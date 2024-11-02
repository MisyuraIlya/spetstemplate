import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {
    @IsOptional()
    @IsString()
    title?: string;
  
    @IsOptional()
    @IsString()
    description?: string;
  
    @IsOptional()
    @IsString()
    category?: string;
  
    @IsOptional()
    @IsString()
    brand?: string;  // Make brand optional
  
    @IsOptional()
    @IsString()
    sku?: string;
  
    @IsOptional()
    @IsBoolean()
    isPublished?: boolean;
}

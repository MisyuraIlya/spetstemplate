import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';


export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsString()
  category: string;

  @IsNotEmpty()
  @IsString()
  brand: string;

  @IsNotEmpty()
  @IsString()
  sku: string;  

  @IsOptional()
  @IsBoolean()
  isPublished?: boolean;
}
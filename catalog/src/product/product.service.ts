import { BadRequestException, Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

@Injectable()
export class ProductService {
  constructor(@InjectModel(Product.name) private productModel: Model<Product>) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    this.validateObjectId(createProductDto.category, 'Category ID');
    
    const newProduct = new this.productModel({
      ...createProductDto,
      category: new Types.ObjectId(createProductDto.category),
    });

    try {
      return await newProduct.save();
    } catch (error) {
      throw new InternalServerErrorException('Failed to create product');
    }
  }

  async findAll(page: number, perPage: number, sort: string, order: string): Promise<{ data: Product[]; total: number }> {
    const skip = (page - 1) * perPage;
    const sortOrder = order === 'asc' ? 1 : -1;

    try {
      const [data, total] = await Promise.all([
        this.productModel
          .find()
          .populate('category')
          .sort({ [sort]: sortOrder })
          .skip(skip)
          .limit(perPage)
          .exec(),
        this.productModel.countDocuments().exec(),
      ]);

      return { data, total };
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve products');
    }
  }

  async findOne(id: string): Promise<Product> {
    this.validateObjectId(id, 'Product ID');
    
    const product = await this.productModel.findById(id).populate('category').exec();
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    this.validateObjectId(id, 'Product ID');
    
    const updatedProduct = await this.productModel.findByIdAndUpdate(id, updateProductDto, { new: true }).populate('category').exec();
    if (!updatedProduct) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return updatedProduct;
  }

  async remove(id: string): Promise<{ message: string }> {
    this.validateObjectId(id, 'Product ID');
    
    const result = await this.productModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return { message: 'Product successfully deleted' };
  }

  private validateObjectId(id: string, fieldName: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException(`Invalid ${fieldName}`);
    }
  }
}

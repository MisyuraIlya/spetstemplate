import {
  BadRequestException,
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ProductPublisher } from './events/publisher/product.publisher';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
    private readonly ProductPublisher: ProductPublisher
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    this.validateObjectId(createProductDto.category, 'Category ID');
    if (createProductDto.brand) {
      this.validateObjectId(createProductDto.brand, 'Brand ID');
    }
  
    const newProduct = new this.productModel({
      ...createProductDto,
      category: new Types.ObjectId(createProductDto.category),
      brand: createProductDto.brand ? new Types.ObjectId(createProductDto.brand) : undefined,
      isPublished: createProductDto.isPublished ?? false,
      sku: createProductDto.sku,
    });
  
    try {
      const data =  await newProduct.save();
      if(data){
        await this.ProductPublisher.publishCreated(createProductDto);
      }
      return data
    } catch (error) {
      console.error('Error creating product:', error);  
      throw new InternalServerErrorException('Failed to create product');
    }
  }

  async findAll(
    page: number,
    perPage: number,
    sort: string,
    order: string,
    category: string | null,
    childCategory: string | null
  ): Promise<{ data: Product[]; total: number }> {
    const skip = (page - 1) * perPage;
    const sortOrder = order === 'asc' ? 1 : -1;
    const filter: Record<string, any> = {};
  
    if (category) {
      filter.category = new Types.ObjectId(category);
    }
  
    // if (childCategory) {
    //   const childCategoryIds = await this.categoryModel
    //     .find({ parent: category })
    //     .distinct('_id');
    //   filter.category = { $in: childCategoryIds };
    // }
  
    try {
      const [data, total] = await Promise.all([
        this.productModel
          .find(filter)
          .populate('category')
          .populate('brand')
          .sort({ [sort]: sortOrder })
          .skip(skip)
          .limit(perPage)
          .exec(),
        this.productModel.countDocuments(filter).exec(),
      ]);
  
      return { data, total };
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve products');
    }
  }

  async findOne(id: string): Promise<Product> {
    this.validateObjectId(id, 'Product ID');

    const product = await this.productModel
    .findById(id)
    // .populate('category')
    // .populate('brand')
    .exec();  // Populate brand
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    this.validateObjectId(id, 'Product ID');
    if (updateProductDto.brand) {
      this.validateObjectId(updateProductDto.brand, 'Brand ID');
    }

    const updateData = {
      ...updateProductDto,
      brand: updateProductDto.brand ? new Types.ObjectId(updateProductDto.brand) : undefined,
      isPublished: updateProductDto.isPublished,
      sku: updateProductDto.sku,
    };

    const updatedProduct = await this.productModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();

    if(updatedProduct){
      await this.ProductPublisher.publishUpdated(updateProductDto);
    }

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

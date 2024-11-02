import {
  BadRequestException,
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

@Injectable()
export class BrandService {
  constructor(@InjectModel(Brand.name) private brandModel: Model<Brand>) {}

  async create(createBrandDto: CreateBrandDto): Promise<Brand> {
    try {
      const newBrand = new this.brandModel(createBrandDto);
      return await newBrand.save();
    } catch (error) {
      throw new InternalServerErrorException('Failed to create brand', error.message);
    }
  }

  async findAll(page: number, perPage: number, sort: string, order: string): Promise<{ data: Brand[]; total: number }> {
    const skip = (page - 1) * perPage;
    const sortOrder = order === 'asc' ? 1 : -1;

    try {
      const [data, total] = await Promise.all([
        this.brandModel
          .find()
          .sort({ [sort]: sortOrder })
          .skip(skip)
          .limit(perPage)
          .exec(),
        this.brandModel.countDocuments().exec(),
      ]);

      return { data, total };
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve brands');
    }
  }

  async findOne(id: string): Promise<Brand> {
    this.validateObjectId(id, 'Brand ID');

    const brand = await this.brandModel.findById(id).exec();
    if (!brand) {
      throw new NotFoundException(`Brand with ID ${id} not found`);
    }

    return brand;
  }

  async update(id: string, updateBrandDto: UpdateBrandDto): Promise<Brand> {
    this.validateObjectId(id, 'Brand ID');

    const updatedBrand = await this.brandModel.findByIdAndUpdate(id, updateBrandDto, { new: true }).exec();
    if (!updatedBrand) {
      throw new NotFoundException(`Brand with ID ${id} not found`);
    }

    return updatedBrand;
  }

  async remove(id: string): Promise<{ message: string }> {
    this.validateObjectId(id, 'Brand ID');

    const result = await this.brandModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Brand with ID ${id} not found`);
    }

    return { message: 'Brand successfully deleted' };
  }

  private validateObjectId(id: string, fieldName: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException(`Invalid ${fieldName}`);
    }
  }
}

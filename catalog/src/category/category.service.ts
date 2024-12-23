import { BadRequestException, Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './entities/category.entity';
import { Model, Types } from 'mongoose';

@Injectable()
export class CategoryService {
  constructor(@InjectModel(Category.name) private categoryModel: Model<Category>) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const { title, parent } = createCategoryDto;
    const existCategory = await this.categoryModel.findOne({ title });
    if (existCategory) {
      throw new BadRequestException('Category already exists');
    }
    if (parent) {
      const parentCategory = await this.categoryModel.findById(parent);
      if (!parentCategory) {
        throw new BadRequestException('Parent category does not exist');
      }
    }
    const category = new this.categoryModel(createCategoryDto);
    try {
      const savedCategory = await category.save();
      if (parent) {
        await this.categoryModel.findByIdAndUpdate(parent, {
          $push: { children: savedCategory._id },
        });
      }
      return savedCategory;
    } catch (error) {
      throw new InternalServerErrorException('Failed to create category');
    }
  }

  async findAll(
    page: number,
    perPage: number,
    sort: string,
    order: string,
    parentExists: boolean,
    parent: string
  ): Promise<{ data: Category[]; total: number }> {
    const skip = (page - 1) * perPage;
    const sortOrder = order === 'asc' ? 1 : -1;
  
    // Build the filter based on parentExists and parent independently
    const filter: Record<string, unknown> = {};
    if (parentExists) {
      filter.parent = { $eq: null };
    }
    if (parent) {
      filter.parent = parent;
    }
  
    try {
      const [data, total] = await Promise.all([
        this.categoryModel
          .find(filter)
          .sort({ [sort]: sortOrder })
          .skip(skip)
          .limit(perPage)
          .populate({
            path: 'children',
            model: 'Category', 
          })
          .exec(),
        this.categoryModel.countDocuments(filter).exec(),
      ]);
  
      return { data, total };
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve categories');
    }
  }
  

  async findOne(id: string): Promise<Category> {
    this.validateObjectId(id, 'Category ID');

    const category = await this.categoryModel.findById(id).populate({
      path: 'children',
      model: 'Category', // Ensure the model name matches your Category schema
    }).exec();

    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    return category;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    this.validateObjectId(id, 'Category ID');

    const updatedCategory = await this.categoryModel.findByIdAndUpdate(id, updateCategoryDto, { new: true }).exec();
    if (!updatedCategory) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    return updatedCategory;
  }

  async remove(id: string): Promise<{ message: string }> {
    this.validateObjectId(id, 'Category ID');

    const result = await this.categoryModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    return { message: 'Category successfully deleted' };
  }

  private validateObjectId(id: string, fieldName: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException(`Invalid ${fieldName}`);
    }
  }
}

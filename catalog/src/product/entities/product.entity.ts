import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({
  toJSON: {
    transform: (doc, ret) => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
    },
  },
})
export class Product extends Document {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ type: Types.ObjectId, ref: 'Category', required: true })
  category: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Brand'})
  brand: Types.ObjectId;

  @Prop({ type: Boolean, default: false })
  isPublished: boolean;

  @Prop({ required: true, unique: true })
  sku: string;  
}

export const ProductSchema = SchemaFactory.createForClass(Product);

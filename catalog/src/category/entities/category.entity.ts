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
export class Category extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ type: Types.ObjectId, ref: 'Category', default: null })
  parent: Types.ObjectId | null;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Category' }] })
  children: Types.ObjectId[];
}

export const CategorySchema = SchemaFactory.createForClass(Category);

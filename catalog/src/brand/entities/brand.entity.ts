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
export class Brand extends Document {
  @Prop({ required: true })
  title: string;
}

export const BrandSchema = SchemaFactory.createForClass(Brand);

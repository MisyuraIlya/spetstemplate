import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  toJSON: {
    transform: (doc, ret) => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
    },
  },
})
export class Warehouse extends Document {
  @Prop({ required: true })
  title: string;
}

export const WarehouseSchema = SchemaFactory.createForClass(Warehouse);

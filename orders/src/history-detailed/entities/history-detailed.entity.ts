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
export class HistoryDetailed extends Document {
  @Prop({ type: Types.ObjectId, ref: 'History', required: true })
  history: Types.ObjectId; 

  @Prop({ type: Types.ObjectId, ref: 'Product', required: true })
  product: Types.ObjectId; 

  @Prop()
  quantity: number;

  @Prop()
  price: number;

  @Prop()
  discount: number;

  @Prop()
  total: number;
}

export const HistoryDetailedSchema = SchemaFactory.createForClass(HistoryDetailed);

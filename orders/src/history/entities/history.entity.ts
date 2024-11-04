import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { OrderStatus } from 'src/enum/order-status';

@Schema({
  toJSON: {
    transform: (doc, ret) => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
    },
  },
})
export class History extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop()
  total: number;

  @Prop()
  discount: number;

  @Prop({ required: true, enum: OrderStatus })
  status: OrderStatus;

  @Prop({ default: () => new Date() }) 
  createdAt: Date;
}

export const HistorySchema = SchemaFactory.createForClass(History);

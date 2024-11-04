import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Product } from 'src/entities/product.entity';
import { Warehouse } from 'src/warehouse/entities/warehouse.entity';

@Schema({
  toJSON: {
    transform: (doc, ret) => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
    },
  },
})
export class Stock extends Document {
  @Prop({ required: true })
  stock: number;

  @Prop({ type: Types.ObjectId, ref: 'Product', required: true })
  product: Types.ObjectId | Product;

  @Prop({ type: Types.ObjectId, ref: 'Warehouse', required: true })
  warehouse: Types.ObjectId | Warehouse;
}

export const StockSchema = SchemaFactory.createForClass(Stock);

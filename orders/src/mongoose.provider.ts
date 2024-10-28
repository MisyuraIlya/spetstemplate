// src/mongoose.provider.ts
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export const MongooseProvider = MongooseModule.forRootAsync({
  useFactory: async (): Promise<MongooseModuleOptions> => {
    const uri = process.env.MONGODB_URI;

    mongoose.connection.on('connected', () => {
      console.log('Successfully connected to MongoDB');
    });

    mongoose.connection.on('error', (error) => {
      console.error('Error connecting to MongoDB:', error);
    });

    return {
      uri,
    };
  },
});

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ type: String, required: true, unique: true, max: 50 })
  email: string;

  @Prop({ type: String, required: true, min: 8 })
  password: string;

  @Prop({ type: String, required: true, min: 8 })
  name: string;

  @Prop({ type: String, required: false })
  secret: string;

  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Chat', default: [] }],
  })
  chats: Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';

export type NoteDocument = Note & Document;

@Schema({ timestamps: true })
export class Note {
  @Prop({ type: String, required: false, default: '', max: 50 })
  excerpt: string;

  @Prop({ type: String, required: false, default: '' })
  body: string;

  @Prop({ type: String, required: false, default: '' })
  title: string;

  @Prop({ type: Boolean, required: false, default: false })
  deleted: boolean;

  @Prop({ type: Boolean, required: false, default: false })
  pinned: boolean;

  @Prop({ type: Array, required: false, default: [] })
  tags: [];

  @Prop({
    type: [
      { type: MongooseSchema.Types.ObjectId, ref: 'User', required: true },
    ],
  })
  createdBy: Types.ObjectId;
}

export const NoteSchema = SchemaFactory.createForClass(Note);

import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Note } from './note.model';

@Injectable()
export class NoteService {
  constructor(@InjectModel('Note') private readonly NoteModel: Model<Note>) {}
  create(createNoteDto: CreateNoteDto) {
    return this.NoteModel.create({ createdBy: createNoteDto.userId });
  }

  findAll(id: string) {
    return this.NoteModel.find({ createdBy: id });
  }
  update(id: string, updateNoteDto: UpdateNoteDto) {
    return this.NoteModel.findOneAndUpdate({ _id: id }, updateNoteDto, {
      new: true,
    });
  }
  delete(id: string) {
    try {
      return this.NoteModel.findByIdAndDelete(id);
    } catch (e) {
      console.log(e);
    }
  }
}

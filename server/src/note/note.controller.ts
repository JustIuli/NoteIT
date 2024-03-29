import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { NoteService } from './note.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { NoteDocument } from './note.model';

@Controller('note')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @ApiOperation({ summary: 'Creates a note' })
  @ApiResponse({
    status: 200,
    description: 'Creates an empty note and returns it',
    type: null,
    isArray: false,
  })
  @ApiTags('Note')
  @Post()
  create(@Body() createNoteDto: CreateNoteDto) {
    return this.noteService.create(createNoteDto);
  }

  @ApiOperation({
    summary: 'Returns all the notes created by a particular user',
  })
  @ApiResponse({
    status: 200,
    description:
      'Returns all the notes created by a particular user using the field createdBy',
    type: Object,
    isArray: true,
  })
  @ApiTags('Note')
  @Get('/all/:id')
  findAll(@Param('id') id: string) {
    return this.noteService.findAll(id);
  }
  @ApiOperation({
    summary: 'Updates the note with the specified fields',
  })
  @ApiResponse({
    status: 200,
    description:
      'Updates the note with the specified fields',
    type: null,
    isArray: false,
  })
  @ApiTags('Note')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto) {
    return this.noteService.update(id, updateNoteDto);
  }
  @ApiOperation({ summary: 'Deleted the note' })
  @ApiResponse({
    status: 200,
    description: 'Deletes the note that is found with the provided id',
    type: null,
    isArray: false,
  })
  @ApiTags('Note')
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.noteService.delete(id);
  }
}

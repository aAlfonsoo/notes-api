import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  Req,
  Query,
  UseGuards,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateNoteDto } from './create-note.dto';

@Controller('api/notes')
@UseGuards(AuthGuard('google'))
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  async createNote(@Body() createNoteDto: CreateNoteDto, @Req() req) {
    const user = req.user;
    return this.notesService.createNote(createNoteDto.title, createNoteDto.content, user);
  }

  @Get()
  async getNotes(
    @Req() req,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10
  ) {
    const user = req.user;
    return this.notesService.findAllNotesByUser(user, page, limit);
  }

  @Get(':noteId')
  async getNoteById(@Param('noteId') noteId: string, @Req() req) {
    const user = req.user;
    return this.notesService.findNoteById(noteId, user);
  }

  @Put(':noteId')
  async updateNote(
    @Param('noteId') noteId: string,
    @Body() createNoteDto: CreateNoteDto,
    @Req() req,
  ) {
    const user = req.user;
    return this.notesService.updateNote(
      noteId,
      createNoteDto.title,
      createNoteDto.content,
      user,
    );
  }

  @Delete(':noteId')
  async deleteNote(@Param('noteId') noteId: string, @Req() req) {
    const user = req.user;
    return this.notesService.deleteNote(noteId, user);
  }
}

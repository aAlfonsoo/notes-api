import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Note } from './note.schema';
import { User } from '../user/user.schema';

@Injectable()
export class NotesService {
  constructor(@InjectModel(Note.name) private noteModel: Model<Note>) {}

  async createNote(title: string, content: string, user: User): Promise<Note> {
    const newNote = new this.noteModel({ title, content, user });
    return newNote.save();
  }

  async findAllNotesByUser(
    user: User,
    page: number = 1,
    limit: number = 10
  ): Promise<{ notes: Note[]; total: number }> {
    const skip = (page - 1) * limit;
    const [notes, total] = await Promise.all([
      this.noteModel.find({ user }).skip(skip).limit(limit).exec(),
      this.noteModel.countDocuments({ user }).exec()
    ]);

    return { notes, total };
  }

  async findNoteById(noteId: string, user: User): Promise<Note> {
    const note = await this.noteModel.findOne({ _id: noteId, user }).exec();
    if (!note) {
      throw new NotFoundException('Note not found');
    }
    return note;
  }

  async updateNote(
    noteId: string,
    title: string,
    content: string,
    user: User,
  ): Promise<Note> {
    const updatedNote = await this.noteModel
      .findOneAndUpdate(
        { _id: noteId, user },
        { title, content },
        { new: true },
      )
      .exec();
    if (!updatedNote) {
      throw new NotFoundException('Note not found or user not authorized');
    }
    return updatedNote;
  }

  async deleteNote(noteId: string, user: User): Promise<void> {
    const result = await this.noteModel.deleteOne({ _id: noteId, user }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException('Note not found or user not authorized');
    }
  }
}

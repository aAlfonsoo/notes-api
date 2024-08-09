import { Test, TestingModule } from '@nestjs/testing';
import { NotesService } from './notes.service';
import { getModelToken } from '@nestjs/mongoose';
import { Note } from './note.schema';
import { User } from '../user/user.schema';
import { Model } from 'mongoose';

const mockNoteModel = {
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  findOneAndUpdate: jest.fn(),
  deleteOne: jest.fn(),
};

describe('NotesService', () => {
  let service: NotesService;
  let model: Model<Note>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotesService,
        {
          provide: getModelToken(Note.name),
          useValue: mockNoteModel,
        },
      ],
    }).compile();

    service = module.get<NotesService>(NotesService);
    model = module.get<Model<Note>>(getModelToken(Note.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

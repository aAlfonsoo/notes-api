import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { GoogleStrategy } from './google.strategy';
import { UserService } from '../user/user.service';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        JwtService,
        JwtStrategy,
        GoogleStrategy,
        UserService,
        {
          provide: AuthService,
          useValue: {
            validateUser: jest.fn().mockResolvedValue({ access_token: 'mocked-token' }),
            generateJwtToken: jest.fn().mockReturnValue({ access_token: 'mocked-token' }),
          },
        },
        {
          provide: UserService,
          useValue: {
        
          },
        },
        {
          provide: JwtStrategy,
          useValue: {
      
          },
        },
        {
          provide: GoogleStrategy,
          useValue: {
     
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService); 
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

});

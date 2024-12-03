import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

import { UsersService } from './users.service';
import { User } from './user.schema';

describe('[UsersService]', () => {
  let service: UsersService;
  let userModel: any;

  beforeEach(async () => {
    userModel = {
      create: jest.fn(),
      save: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(User.name),
          useValue: userModel,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new user', async () => {
    const userInput = { name: 'John Doe', email: 'john.doe@example.com' };
    const userOutput = { ...userInput, _id: 'mock-id' };

    userModel.create.mockResolvedValue(userOutput);

    const result = await service.createUser(userInput.name, userInput.email);

    expect(result).toEqual(userOutput);
    expect(userModel.create).toHaveBeenCalledWith(userInput);
  });
});

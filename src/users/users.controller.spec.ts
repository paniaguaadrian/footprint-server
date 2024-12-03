import { Test, TestingModule } from '@nestjs/testing';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './user.schema';

describe('[UsersController]', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const mockUsersService = {
      createUser: jest.fn(),
      getAllUsers: jest.fn(),
      getUserById: jest.fn(),
      deleteUser: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call createUser and return a user', async () => {
    const result: User = {
      _id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
    } as User;
    jest.spyOn(service, 'createUser').mockResolvedValue(result);

    const response = await controller.createUser(
      'John Doe',
      'john.doe@example.com',
    );
    expect(response).toEqual(result);
    expect(service.createUser).toHaveBeenCalledWith(
      'John Doe',
      'john.doe@example.com',
    );
  });

  it('should call getAllUsers and return a list of users', async () => {
    const result: User[] = [
      { _id: '1', name: 'John Doe', email: 'john.doe@example.com' } as User,
    ];
    jest.spyOn(service, 'getAllUsers').mockResolvedValue(result);

    const response = await controller.getAllUsers();
    expect(response).toEqual(result);
    expect(service.getAllUsers).toHaveBeenCalled();
  });

  it('should call getUserById and return a user', async () => {
    const result: User = {
      _id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
    } as User;
    jest.spyOn(service, 'getUserById').mockResolvedValue(result);

    const response = await controller.getUserById('1');
    expect(response).toEqual(result);
    expect(service.getUserById).toHaveBeenCalledWith('1');
  });

  it('should call deleteUser and return a user', async () => {
    const result: User = {
      _id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
    } as User;
    jest.spyOn(service, 'deleteUser').mockResolvedValue(result);

    const response = await controller.deleteUser('1');
    expect(response).toEqual(result);
    expect(service.deleteUser).toHaveBeenCalledWith('1');
  });
});

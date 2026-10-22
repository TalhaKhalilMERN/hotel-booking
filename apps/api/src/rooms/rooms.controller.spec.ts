import { Test, TestingModule } from '@nestjs/testing';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { AdminGuard } from '../auth/guards/admin.guard';

describe('RoomsController', () => {
  let controller: RoomsController;
  let roomsService: { getRooms: jest.Mock };

  beforeEach(async () => {
    roomsService = { getRooms: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoomsController],
      providers: [
        { provide: RoomsService, useValue: roomsService },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: () => true })
      .overrideGuard(AdminGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<RoomsController>(RoomsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('delegates to roomsService.getRooms with hotelId', async () => {
    const hotelId = '11111111-1111-4111-a111-111111111111';
    const mockResponse = { hotelId, rooms: [] };
    roomsService.getRooms.mockResolvedValue(mockResponse);

    const result = await controller.getRooms(hotelId);

    expect(roomsService.getRooms).toHaveBeenCalledWith(hotelId);
    expect(result).toEqual(mockResponse);
  });
});

import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { RoomsService } from './rooms.service';
import { PrismaService } from '../prisma/prisma.service';

describe('RoomsService', () => {
  let service: RoomsService;
  let prisma: {
    hotel: { findUnique: jest.Mock };
    room: { findMany: jest.Mock };
  };

  const validHotelId = '11111111-1111-4111-a111-111111111111';

  beforeEach(async () => {
    prisma = {
      hotel: { findUnique: jest.fn() },
      room: { findMany: jest.fn() },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoomsService,
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    service = module.get<RoomsService>(RoomsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('throws BadRequestException on non-uuid hotelId', async () => {
    await expect(service.getRooms('invalid-hotel-id')).rejects.toThrow(
      BadRequestException,
    );
  });

  it('throws NotFoundException when hotel does not exist', async () => {
    prisma.hotel.findUnique.mockResolvedValue(null);

    await expect(service.getRooms(validHotelId)).rejects.toThrow(
      NotFoundException,
    );
    expect(prisma.hotel.findUnique).toHaveBeenCalledWith({
      where: { id: validHotelId },
      select: { id: true },
    });
  });

  it('returns rooms ordered by floor and roomNumber for existing hotel', async () => {
    prisma.hotel.findUnique.mockResolvedValue({ id: validHotelId });
    const mockRooms = [
      {
        id: 'room-1',
        roomNumber: '101',
        floor: 1,
        status: 'AVAILABLE',
        roomType: { id: 'rt-1', name: 'Classic King' },
      },
      {
        id: 'room-2',
        roomNumber: '201',
        floor: 2,
        status: 'AVAILABLE',
        roomType: { id: 'rt-2', name: 'Deluxe Executive' },
      },
    ];
    prisma.room.findMany.mockResolvedValue(mockRooms);

    const result = await service.getRooms(validHotelId);

    expect(prisma.room.findMany).toHaveBeenCalledWith({
      where: { hotelId: validHotelId },
      orderBy: [{ floor: 'asc' }, { roomNumber: 'asc' }],
      select: {
        id: true,
        roomNumber: true,
        floor: true,
        status: true,
        roomType: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    expect(result).toEqual({
      hotelId: validHotelId,
      rooms: mockRooms,
    });
  });
});

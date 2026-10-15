import { Test, TestingModule } from '@nestjs/testing';
import { HotelService } from './hotel.service';
import { PrismaService } from '../prisma/prisma.service';

describe('HotelService', () => {
  let service: HotelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HotelService,
        { provide: PrismaService, useValue: {} },
      ],
    }).compile();

    service = module.get<HotelService>(HotelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

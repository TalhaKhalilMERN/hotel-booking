import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

@Injectable()
export class RoomsService {
  constructor(private readonly prisma: PrismaService) {}

  async getRooms(hotelId: string) {
    if (!hotelId || typeof hotelId !== 'string' || !UUID_REGEX.test(hotelId.trim())) {
      throw new BadRequestException('Validation failed (valid uuid is expected)');
    }

    const normalizedHotelId = hotelId.trim();

    const hotel = await this.prisma.hotel.findUnique({
      where: { id: normalizedHotelId },
      select: { id: true },
    });

    if (!hotel) {
      throw new NotFoundException('Hotel not found');
    }

    const rooms = await this.prisma.room.findMany({
      where: { hotelId: normalizedHotelId },
      orderBy: [
        { floor: 'asc' },
        { roomNumber: 'asc' },
      ],
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

    return {
      hotelId: hotel.id,
      rooms,
    };
  }
}

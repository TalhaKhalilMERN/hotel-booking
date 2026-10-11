
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class HotelService {
    constructor(private readonly prisma: PrismaService) { }

    async getHotel() {
        const hotel = await this.prisma.hotel.findFirst({
            select: {
                id: true,
                name: true,
                address: true,
                city: true,
                country: true,
                description: true,
                timezone: true,
                currency: true,
            },
        });

        if (!hotel) {
            throw new NotFoundException('Hotel not found');
        }

        return hotel;
    }
}
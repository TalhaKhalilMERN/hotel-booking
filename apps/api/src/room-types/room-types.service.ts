
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RoomTypesService {
    constructor(private readonly prisma: PrismaService) { }

    async getRoomTypes(hotelId: string) {
        const hotel = await this.prisma.hotel.findUnique({
            where: { id: hotelId },
            select: {
                id: true,
                currency: true,
            },
        });

        if (!hotel) {
            throw new NotFoundException('Hotel not found');
        }

        const roomTypes = await this.prisma.roomType.findMany({
            where: { hotelId },
            orderBy: { basePrice: 'asc' },
            select: {
                id: true,
                name: true,
                description: true,
                basePrice: true,
                capacityAdults: true,
                capacityChildren: true,
                sizeSqm: true,
                bedConfig: true,
                amenities: {
                    select: {
                        amenity: {
                            select: {
                                id: true,
                                name: true,
                                iconKey: true,
                            },
                        },
                    },
                },
            },
        });

        return {
            hotelId: hotel.id,
            currency: hotel.currency,
            roomTypes: roomTypes.map((roomType) => ({
                ...roomType,
                basePrice: roomType.basePrice.toString(),
                amenities: roomType.amenities.map(
                    (roomTypeAmenity) => roomTypeAmenity.amenity,
                ),
            })),
        };
    }
}
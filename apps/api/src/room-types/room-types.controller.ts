
import { Controller, Get, Param } from '@nestjs/common';
import { RoomTypesService } from './room-types.service';

@Controller('hotels/:hotelId/room-types')
export class RoomTypesController {
    constructor(
        private readonly roomTypesService: RoomTypesService,
    ) { }

    @Get()
    getRoomTypes(@Param('hotelId') hotelId: string) {
        return this.roomTypesService.getRoomTypes(hotelId);
    }
}
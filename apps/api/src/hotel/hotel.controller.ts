
import { Controller, Get } from '@nestjs/common';
import { HotelService } from './hotel.service';

@Controller('hotel')
export class HotelController {
    constructor(private readonly hotelService: HotelService) { }

    @Get()
    getHotel() {
        return this.hotelService.getHotel();
    }
}
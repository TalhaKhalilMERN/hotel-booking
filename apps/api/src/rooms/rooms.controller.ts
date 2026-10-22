import { Controller, Get, Param, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { AdminGuard } from '../auth/guards/admin.guard';

@Controller('hotels/:hotelId/rooms')
@UseGuards(AuthGuard, AdminGuard)
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Get()
  getRooms(@Param('hotelId', new ParseUUIDPipe({ version: '4' })) hotelId: string) {
    return this.roomsService.getRooms(hotelId);
  }
}

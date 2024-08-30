import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { RoomService } from './room.service';

@Controller('rooms')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get()
  async findAll(
    @Query('location') location?: string,
    @Query('checkin') checkInDate?: string,
    @Query('checkout') checkOutDate?: string,
  ) {
    return this.roomService.findAll({ location, checkInDate, checkOutDate });
  }

  @Get(':id')
  async getRoom(@Param('id', ParseIntPipe) id: number) {
    return this.roomService.findOne(id);
  }
}

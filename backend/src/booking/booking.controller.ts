import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingDto } from '../dto/booking.dto';

@Controller('bookings')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Get()
  async findAll() {
    return this.bookingService.findAll();
  }

  @Get(':id')
  async getDetail(@Param('id', ParseIntPipe) id: number) {
    return this.bookingService.getDetail(id);
  }

  @Post()
  async createBooking(@Body() bookingDto: BookingDto) {
    return this.bookingService.create(bookingDto);
  }

  @Delete(':id')
  async deleteBooking(@Param('id', ParseIntPipe) id: number) {
    return this.bookingService.deleteBooking(id);
  }
}

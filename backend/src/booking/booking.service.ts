import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Bookings } from '@prisma/client';
import { BookingDto } from 'src/dto/booking.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BookingService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.bookings.findMany({
      include: {
        room: true,
      },
    });
  }

  async create(data: BookingDto): Promise<Bookings> {
    // Check if the room exists
    const room = await this.prisma.rooms.findUnique({
      where: { id: +data.room_id },
    });

    if (!room) {
      throw new NotFoundException(
        `Room with ID ${data.room_id} does not exist.`,
      );
    }

    const existingBookings = await this.prisma.bookings.findMany({
      where: {
        room_id: +data.room_id,
        status: 'Booked',
        check_in_date: {
          lt: new Date(data.check_out_date),
        },
        check_out_date: {
          gt: new Date(data.check_in_date),
        },
      },
    });

    if (existingBookings.length > 0) {
      throw new ConflictException(
        'The room is already booked for the specified dates.',
      );
    }

    return this.prisma.bookings.create({
      data: {
        room_id: +data.room_id,
        user_name: data.user_name,
        check_in_date: data.check_in_date,
        check_out_date: data.check_out_date,
        status: data.status,
      },
    });
  }

  async deleteBooking(id: number): Promise<Bookings> {
    // Check if the booking exists
    const booking = await this.prisma.bookings.findUnique({
      where: { id },
    });

    if (!booking) {
      throw new NotFoundException(`Booking with ID ${id} does not exist.`);
    }

    // Proceed to delete the booking
    return this.prisma.bookings.delete({
      where: { id },
    });
  }

  async getDetail(id: number): Promise<Bookings> {
    // Check if the booking exists
    const booking = await this.prisma.bookings.findUnique({
      where: { id },
    });

    if (!booking) {
      throw new NotFoundException(`Booking with ID ${id} does not exist.`);
    }

    // Proceed to delete the booking
    return await this.prisma.bookings.findUnique({
      where: {
        id: id,
      },
      include: {
        room: true,
      },
    });
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RoomService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(filters: {
    location?: string;
    checkInDate?: string;
    checkOutDate?: string;
  }) {
    const { location, checkInDate, checkOutDate } = filters;
    const checkinDate = checkInDate ? new Date(checkInDate) : null;
    const checkoutDate = checkOutDate ? new Date(checkOutDate) : null;

    // Build the filtering query
    return await this.prisma.rooms.findMany({
      where: {
        AND: [
          location
            ? {
                location: {
                  contains: location,
                  mode: 'insensitive', // Case-insensitive search
                },
              }
            : {}, // No location filter if not provided
          checkinDate && checkoutDate
            ? {
                // Exclude rooms that have bookings that conflict with the given check-in and check-out dates
                bookings: {
                  none: {
                    OR: [
                      {
                        check_in_date: {
                          lt: checkoutDate,
                        },
                        check_out_date: {
                          gt: checkinDate,
                        },
                      },
                    ],
                  },
                },
              }
            : {}, // No date filter if not provided
        ],
      },
      include: {
        bookings: true, // Include related bookings for reference if needed
      },
    });
  }

  async findOne(id: number) {
    const room = await this.prisma.rooms.findUnique({
      where: { id },
    });

    if (!room) {
      throw new NotFoundException(`Room not found`);
    }

    return room;
  }

  //   async create(data: { email: string; name?: string }) {
  //     return this.prisma.rooms.create({ data });
  //   }
}

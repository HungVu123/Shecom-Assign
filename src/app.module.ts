import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { RoomModule } from './room/room.module';
import { BookingModule } from './booking/booking.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), BookingModule, RoomModule, PrismaModule],
})
export class AppModule {}

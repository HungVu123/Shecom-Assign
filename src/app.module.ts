import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { RoomModule } from './room/room.module';

@Module({
  imports: [RoomModule, PrismaModule],
})
export class AppModule {}

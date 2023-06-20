import { Module } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { RestaurantsController } from './restaurants.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [RestaurantsService],
  controllers: [RestaurantsController],
  imports: [PrismaModule],
})
export class RestaurantsModule {}

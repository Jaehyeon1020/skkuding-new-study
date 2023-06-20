import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpExceptionFilter } from './exception_filters/http-exception.filter';
import { LoggerInterceptor } from './interceptors/logger.interceptor';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [RestaurantsModule, PrismaModule],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
    { provide: APP_INTERCEPTOR, useClass: LoggerInterceptor },
  ],
})
export class AppModule {}

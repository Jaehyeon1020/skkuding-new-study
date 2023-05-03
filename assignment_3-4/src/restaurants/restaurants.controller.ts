import { Restaurant } from '../data/restaurants-data';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { CreateRestaurantDto } from 'src/dto/create-restaurant.dto';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  /** 모든 식당 정보 찾기 */
  @Get('/')
  getRestaurants(): Restaurant[] {
    return this.restaurantsService.getRestaurants();
  }

  /** 이름으로 식당 정보 찾기 */
  @Get('/:name')
  getRestaurantsByName(@Param('name') name: string): Restaurant {
    return this.restaurantsService.getRestaurantByName(name);
  }

  /** 새로운 식당 정보 등록 */
  @Post('/')
  createRestaurant(@Body() createRestaurantDto: CreateRestaurantDto) {
    return this.restaurantsService.createRestaurant(createRestaurantDto);
  }

  /** 식당 정보 삭제 */
  @Delete('/:name')
  deleteRestaurantByName(@Param('name') name: string): Restaurant {
    return this.restaurantsService.deleteRestaurantByName(name);
  }

  /** 식당 정보 수정 */
  @Patch('/:name')
  updateRestaurantByName(
    @Param('name') name: string,
    @Body() createRestaurantDto: CreateRestaurantDto,
  ): Restaurant {
    return this.restaurantsService.updateRestaurantByName(
      name,
      createRestaurantDto,
    );
  }
}

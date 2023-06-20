import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { CreateRestaurantDto } from 'src/dto/create-restaurant.dto';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  /** 모든 식당 정보 찾기 */
  @Get('/')
  getRestaurants() {
    return this.restaurantsService.getRestaurants();
  }

  /** 이름으로 식당 정보 찾기 */
  @Get('/:name')
  getRestaurantsByName(@Param('name') name: string) {
    return this.restaurantsService.getRestaurantByName(name);
  }

  /** 새로운 식당 정보 등록 */
  @Post('/')
  @UsePipes(ValidationPipe)
  createRestaurant(@Body() createRestaurantDto: CreateRestaurantDto) {
    return this.restaurantsService.createRestaurant(createRestaurantDto);
  }

  /** 식당 정보 삭제 */
  @Delete('/:name')
  deleteRestaurantByName(@Param('name') name: string) {
    return this.restaurantsService.deleteRestaurantByName(name);
  }

  /** 식당 정보 수정 */
  @Patch('/:name')
  @UsePipes(ValidationPipe)
  updateRestaurantByName(
    @Param('name') name: string,
    @Body() createRestaurantDto: CreateRestaurantDto,
  ) {
    return this.restaurantsService.updateRestaurantByName(
      name,
      createRestaurantDto,
    );
  }
}

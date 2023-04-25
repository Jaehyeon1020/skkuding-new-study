import { Restaurant } from '../data/restaurants-data';
import { Controller, Get } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @Get('/')
  getRestaurants(): Restaurant[] {
    return this.restaurantsService.getRestaurants();
  }
}

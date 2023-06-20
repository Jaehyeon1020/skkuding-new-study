import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Restaurant } from 'src/models/restaurants.model';
import { RestaurantsService } from './restaurants.service';

@Resolver((of) => Restaurant)
export class RestaurantsResolver {
  constructor(private restaurantService: RestaurantsService) {}

  @Query((returns) => Restaurant)
  async restaurant(@Args('name') name: string) {
    return await this.restaurantService.getRestaurantByName(name);
  }

  @Query((returns) => [Restaurant])
  async restaurants() {
    return await this.restaurantService.getRestaurants();
  }
}

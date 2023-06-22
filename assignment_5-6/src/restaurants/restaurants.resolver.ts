import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Restaurant } from 'src/models/restaurants.model';
import { RestaurantsService } from './restaurants.service';
import { NewRestaurantInput } from 'src/dto/new-restaurant.input';

@Resolver(() => Restaurant)
export class RestaurantsResolver {
  constructor(private restaurantService: RestaurantsService) {}

  @Query(() => Restaurant)
  async restaurant(@Args('name') name: string) {
    const r = await this.restaurantService.getRestaurantByName(name);
    return r;
  }

  @Query(() => [Restaurant])
  async restaurants() {
    return await this.restaurantService.getRestaurants();
  }

  @Mutation(() => Restaurant)
  async createRestaurant(
    @Args('newRestaurantInput') newRestaurantInput: NewRestaurantInput,
  ) {
    return await this.restaurantService.createRestaurant(newRestaurantInput);
  }

  @Mutation(() => Restaurant)
  async deleteRestaurant(@Args('name') name: string) {
    return this.restaurantService.deleteRestaurantByName(name);
  }

  @Mutation(() => Restaurant)
  async updateRestaurant(
    @Args('originalName') name: string,
    @Args('updatedRestaurantInput') updatedRestaurantInput: NewRestaurantInput,
  ) {
    return this.restaurantService.updateRestaurantByName(
      name,
      updatedRestaurantInput,
    );
  }
}

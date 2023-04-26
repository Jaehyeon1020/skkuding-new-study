import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Restaurant } from '../data/restaurants-data';
import { restaurants } from '../data/restaurants-data';
import { CreateRestaurantDto } from 'src/dto/create-restaurant.dto';

@Injectable()
export class RestaurantsService {
  /** 이름으로 가게 정보 데이터 가져오기 */
  getRestaurantObjectByName = (name: string): Restaurant | null => {
    for (const restaurant of restaurants) {
      // 해당 식당이 존재하면 데이터 반환
      if (restaurant.name === name) {
        return restaurant;
      }
    }

    // 존재하지 않으면 null 반환
    return null;
  };

  /** 모든 식당 정보 반환 */
  getRestaurants(): Restaurant[] {
    return restaurants;
  }

  /** 특정 식당 정보 반환 */
  getRestaurantByName(name: string): Restaurant {
    const restaurantData = this.getRestaurantObjectByName(name);

    if (restaurantData) {
      return restaurantData;
    }
    throw new HttpException(
      '해당 맛집 정보가 존재하지 않습니다.',
      HttpStatus.NOT_FOUND,
    );
  }

  /** 식당 정보 생성 */
  createRestaurant(createRestaurantDto: CreateRestaurantDto): Restaurant {
    // 이미 존재하는 식당인 경우 에러
    if (this.getRestaurantObjectByName(createRestaurantDto.name)) {
      throw new HttpException(
        '이미 존재하는 맛집입니다.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const newRestaurant = { ...createRestaurantDto };

    restaurants.push(newRestaurant);
    return newRestaurant;
  }

  /** 식당 정보 삭제 */
  deleteRestaurantByName(name: string): Restaurant {
    const deletingRestaurant = this.getRestaurantObjectByName(name);

    // 삭제할 식당이 없으면 에러 발생
    if (!deletingRestaurant) {
      throw new HttpException(
        '존재하지 않는 맛집입니다.',
        HttpStatus.NOT_FOUND,
      );
    }

    // 식당 정보 삭제
    for (let i = 0; i < restaurants.length; i++) {
      if (restaurants[i].name === name) {
        restaurants.splice(i, 1);
        break;
      }
    }

    // 삭제한 식당 정보 반환
    return deletingRestaurant;
  }

  /** 식당 정보 수정 */
  updateRestaurantByName(
    originalName: string,
    createRestaurantDto: CreateRestaurantDto,
  ): Restaurant {
    const updatingRestaurant = this.getRestaurantObjectByName(originalName);

    if (!updatingRestaurant) {
      throw new HttpException(
        '존재하지 않는 맛집입니다.',
        HttpStatus.NOT_FOUND,
      );
    }

    // 식당 정보 수정
    for (let i = 0; i < restaurants.length; i++) {
      if (restaurants[i].name === originalName) {
        restaurants[i].address = createRestaurantDto.address;
        restaurants[i].phone = createRestaurantDto.phone;
        break;
      }
    }

    return updatingRestaurant;
  }
}

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
// import { Restaurant } from '../data/restaurants-data';
// import { restaurants } from '../data/restaurants-data';
import { CreateRestaurantDto } from 'src/dto/create-restaurant.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RestaurantsService {
  constructor(private prisma: PrismaService) {}

  /** 모든 식당 정보 반환 */
  async getRestaurants() {
    return await this.prisma.restaurant.findMany({
      select: {
        name: true,
        address: true,
        phone: true,
      },
    });
  }

  /** 특정 식당 정보 반환 */
  async getRestaurantByName(name: string) {
    try {
      const restaurant = await this.prisma.restaurant.findFirstOrThrow({
        where: {
          name: name,
        },
      });

      return restaurant;
    } catch (e) {
      throw new NotFoundException('존재하지 않는 식당입니다.');
    }
  }

  /** 식당 정보 생성 */
  async createRestaurant(createRestaurantDto: CreateRestaurantDto) {
    // 존재하는 식당인지 체크
    // unique 켜져있으면 알아서 에러 던져짐!!!!
    const existingRestaurant = await this.prisma.restaurant.findFirst({
      where: {
        name: createRestaurantDto.name,
      },
    });

    if (existingRestaurant) {
      throw new BadRequestException('이미 존재하는 식당입니다.');
    }

    // 새 식당 추가
    const newRestaurant = await this.prisma.restaurant.create({
      data: createRestaurantDto,
    });

    return newRestaurant;
  }

  /** 식당 정보 삭제 */
  async deleteRestaurantByName(name: string) {
    try {
      const restaurant = await this.prisma.restaurant.delete({
        where: {
          name: name,
        },
      });

      return restaurant;
    } catch (e) {
      throw new NotFoundException('존재하지 않는 식당입니다.');
    }
  }

  /** 식당 정보 수정 */
  async updateRestaurantByName(
    originalName: string,
    createRestaurantDto: CreateRestaurantDto,
  ) {
    try {
      const restaurant = await this.prisma.restaurant.update({
        where: {
          name: originalName,
        },
        data: createRestaurantDto,
      });

      return restaurant;
    } catch (e) {
      throw new NotFoundException('존재하지 않는 식당입니다.');
    }
  }
}

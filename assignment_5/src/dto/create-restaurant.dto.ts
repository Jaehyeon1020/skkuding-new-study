import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateRestaurantDto {
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  name: string;

  @IsString()
  address: string;

  @IsString()
  @IsOptional()
  phone: string;
}

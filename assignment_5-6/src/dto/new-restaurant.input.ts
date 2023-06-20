import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class NewRestaurantInput {
  @Field()
  name: string;

  @Field()
  address: string;

  @Field()
  phone: string;
}

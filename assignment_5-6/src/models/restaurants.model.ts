import { Field, GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'restaurant' })
export class Restaurant {
  @Field((type) => Int, { nullable: true })
  id?: number;

  @Field()
  name: string;

  @Field()
  address: string;

  @Field()
  phone: string;

  @Field((type) => GraphQLISODateTime, { nullable: true })
  createdAt?: Date;

  @Field((type) => GraphQLISODateTime, { nullable: true })
  updatedAt?: Date;
}

import { Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'restaurants' })
export class Restaurant {
  @Field((type) => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  address: string;

  @Field()
  phone: string;

  @Field((type) => GraphQLISODateTime)
  createdAt: Date;

  @Field((type) => GraphQLISODateTime)
  updatedAt: Date;
}

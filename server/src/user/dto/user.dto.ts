import { ObjectType, Field, ID } from 'type-graphql';


@ObjectType()
export class UserType {
  @Field(() => ID)
  id: string;
  @Field()
  readonly username: string;
  @Field()
  readonly email: string;
  @Field()
  readonly password: string;
  @Field()
  readonly role: string;



}

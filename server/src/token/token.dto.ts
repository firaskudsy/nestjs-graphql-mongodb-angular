import { ObjectType, Field } from 'type-graphql';


@ObjectType()
export class TokenType {

  @Field()
  readonly id: string;
  @Field()
  readonly email: string;
  @Field()
  readonly token: string;

}

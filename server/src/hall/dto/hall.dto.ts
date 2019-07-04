import { ObjectType, Field, Int, ID } from 'type-graphql';
import { Event } from '../../event/models/event';


@ObjectType()
export class HallType {
  @Field(() => ID)
  id: string;
  @Field()
  readonly name: string;
  @Field()
  readonly address: string;
  @Field()
  readonly size: string;
  @Field(type => [Event])
  readonly events: Event[];


}

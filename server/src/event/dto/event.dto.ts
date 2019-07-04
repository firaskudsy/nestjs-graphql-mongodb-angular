import { ObjectType, Field, ID } from 'type-graphql';
import { Hall } from '../../hall/models/hall';


@ObjectType()
export class EventType {
  @Field(() => ID)
  id: string;
  @Field()
  readonly title: string;
  @Field()
  readonly description: string;
  @Field()
  readonly location: string;
  @Field()
  readonly startDate: Date;
  @Field()
  readonly endDate: Date;
  @Field(type => [String])
  readonly attendies: string[];
  @Field(type => Hall)
  readonly hall: string;

}

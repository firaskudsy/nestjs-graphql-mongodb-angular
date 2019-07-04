import { Field, ID, ObjectType } from 'type-graphql';
import { Event } from '../../event/models/event';
@ObjectType()
export class Hall {
    @Field(type => ID)
    id: string;

    @Field()
    name: string;
    @Field()
    address: string;
    @Field()
    size: string;
    @Field(type => [Event])
    events: Event[];

}




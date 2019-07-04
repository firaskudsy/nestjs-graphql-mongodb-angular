import { InputType, Field, Int, ID } from 'type-graphql';
import { MaxLength } from 'class-validator';
import { Event } from '../../event/models/event';


@InputType()
export class HallInput {

    @Field()
    @MaxLength(30)
    name: string;

    @Field()
    @MaxLength(230)
    address: string;

    @Field()
    size: string;

    @Field(type => [String])
    events: string[];

}


import { Field, ID, ObjectType } from 'type-graphql';
import { Hall } from '../../hall/models/hall';

@ObjectType()
export class Event {
    @Field(type => ID)
    id: string;

    @Field()
    title: string;
    @Field({ nullable: true })
    description: string;
    @Field()
    location: string;
    @Field()
    startDate: Date;
    @Field()
    endDate: Date;
    @Field(type => [String])
    attendies: string[];
    @Field()
    hall: Hall;
}




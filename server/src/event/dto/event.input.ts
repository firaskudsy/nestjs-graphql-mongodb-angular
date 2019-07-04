import { InputType, Field } from 'type-graphql';
import { MaxLength } from 'class-validator';


@InputType()
export class EventInput {

    @Field()
    @MaxLength(30)
    title: string;

    @Field({ nullable: true })
    @MaxLength(230)
    description: string;

    @Field()
    location: string;

    @Field(() => Date)
    startDate: string;

    @Field(() => Date)
    endDate: string;

    @Field(type => [String])
    attendies: string[];

    @Field()
    hall: string;


}


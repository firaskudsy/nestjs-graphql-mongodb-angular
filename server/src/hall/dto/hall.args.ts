import { Min } from 'class-validator';
import { ArgsType, Field } from 'type-graphql';




@ArgsType()
export class HallArgs {
    @Field(type => String)
    @Min(1)
    id: string;
}

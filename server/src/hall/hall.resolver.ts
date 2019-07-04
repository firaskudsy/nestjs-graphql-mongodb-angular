import { HallService } from './hall.service';
import { Hall } from './models/hall';
import { Resolver, Query, Mutation, Args, Subscription, ResolveProperty, Parent } from '@nestjs/graphql';
import { HallInput } from './dto/hall.input';
import { PubSub } from 'apollo-server-express';
import { NotFoundException } from '@nestjs/common';
import { EventService } from '../event/event.service';
import { Int } from 'type-graphql';
// import * as mongoose from 'mongoose';

const pubSub = new PubSub();

@Resolver(of => Hall)
export class HallResolver {
    constructor(
        private hallService: HallService,
        private eventService: EventService
    ) { }




    @Query(() => String)
    async ping_hall() {
        return 'hello World !! am Hall :)';
    }

    @Query(returns => [Hall])
    async halls() {
        return this.hallService.findAll();
    }


    @ResolveProperty()
    async events(@Parent() hall,
                 @Args({ name: 'skip', type: () => Int, nullable: true }) skip: number,
                 @Args({ name: 'limit', type: () => Int, nullable: true }) limit: number
    ) {
        const id = this.hallService.getObjectIds(hall.events); // .map(sid => mongoose.Types.ObjectId(sid));
        return await this.eventService.findMany(id, skip, limit);
    }



    @Query(returns => Hall)
    async hall(@Args('id') id: string): Promise<Hall> {
        const hall = await this.hallService.findOneById(id);
        if (!hall) {
            throw new NotFoundException(id);
        }
        return hall;
    }

    @Mutation(returns => Hall)
    async addHall(
        @Args('newHallData') newHallData: HallInput,
    ): Promise<Hall> {
        const hall = await this.hallService.create(newHallData);
        pubSub.publish('hallAdded', { hallAdded: hall });
        return hall;
    }

    @Mutation(returns => Hall)
    async removeHall(@Args('id') id: string) {
        return this.hallService.remove(id);
    }

    @Subscription(returns => Hall)
    hallAdded() {
        return pubSub.asyncIterator('hallAdded');
    }

}

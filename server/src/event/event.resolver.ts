import { HallService } from './../hall/hall.service';
import { EventService } from './event.service';
import { Event } from './models/event';
import { Resolver, Query, Mutation, Args, Subscription, ResolveProperty, Parent } from '@nestjs/graphql';
import { EventInput } from './dto/event.input';
import { PubSub } from 'apollo-server-express';
import { NotFoundException } from '@nestjs/common';
import { Int } from 'type-graphql';

const pubSub = new PubSub();

@Resolver(of => Event)
export class EventResolver {
    constructor(
        private eventService: EventService,
        private hallService: HallService
    ) { }




    @Query(() => String)
    async ping_event() {
        return 'hello World !! am Event :)';
    }

    @Query(returns => [Event])
    async events(
        @Args({ name: 'skip', type: () => Int, nullable: true }) skip: number,
        @Args({ name: 'limit', type: () => Int, nullable: true }) limit: number
    ) {

        return this.eventService.findAll(skip, limit);
    }

    @ResolveProperty()
    async hall(@Parent() events) {
        const id = events.hall;
        return await this.hallService.findOneById(id);
    }

    @Query(returns => Event)
    async event(@Args('id') id: string): Promise<Event> {
        const event = await this.eventService.findOneById(id);
        if (!event) {
            throw new NotFoundException(id);
        }
        return event;
    }

    @Mutation(returns => Event)
    async addEvent(
        @Args('newEventData') newEventData: EventInput,
    ): Promise<Event> {
        const event = await this.eventService.create(newEventData);
        pubSub.publish('eventAdded', { eventAdded: event });
        console.log('=======>>>> 2 ');
        return event;
    }

    @Mutation(returns => Event)
    async removeEvent(@Args('id') id: string) {
        return this.eventService.remove(id);
    }

    @Subscription(returns => Event)
    eventAdded() {
        console.log('=======>>>> 1 ');
        return pubSub.asyncIterator('eventAdded');
    }

}

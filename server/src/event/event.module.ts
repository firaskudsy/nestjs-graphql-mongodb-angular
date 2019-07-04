import { HallSchema } from './../hall/schema/hall.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventService } from './event.service';
import { EventSchema } from './schema/event.schema';
import { EventResolver } from './event.resolver';
import { HallService } from '../hall/hall.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Event', schema: EventSchema }]),
  MongooseModule.forFeature([{ name: 'Hall', schema: HallSchema }])],
  controllers: [],
  providers: [EventService, EventResolver, HallService],
})
export class EventModule { }

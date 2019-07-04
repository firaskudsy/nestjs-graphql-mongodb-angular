import { EventService } from './../event/event.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HallSchema } from './schema/hall.schema';
import { HallResolver } from './hall.resolver';
import { HallService } from './hall.service';
import { EventSchema } from '../event/schema/event.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Hall', schema: HallSchema }]),
  MongooseModule.forFeature([{ name: 'Event', schema: EventSchema }])
  ],
  controllers: [],
  providers: [HallResolver, HallService, EventService],
})
export class HallModule { }

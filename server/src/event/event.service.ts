import { EventInput } from './dto/event.input';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Event } from './models/event';
import * as mongoose from 'mongoose';

@Injectable()
export class EventService {
  constructor(@InjectModel('Event') private readonly eventModel: Model<Event>) { }

  async create(createEventDto: EventInput): Promise<Event> {
    const createdEvent = new this.eventModel(createEventDto);
    return await createdEvent.save();
  }

  async findAll(skip?: number, limit?: number): Promise<Event[]> {

    return await this.eventModel.find().skip(skip).limit(limit).exec();
  }


  async findMany(ids: mongoose.SchemaTypes.ObjectType[], skip?: number, limit?: number): Promise<Event[]> {
    return await this.eventModel.find({ _id: { $in: ids } }).skip(skip).limit(limit).exec();

  }
  async findOneById(id: string): Promise<Event> {
    return await this.eventModel.findById(id).exec();
  }

  async remove(id: string): Promise<Event> {
    return await this.eventModel.findByIdAndRemove(id).exec();

  }
}

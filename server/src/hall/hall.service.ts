import { HallInput } from './dto/hall.input';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Hall } from './models/hall';
import * as mongoose from 'mongoose';


@Injectable()
export class HallService {
  constructor(@InjectModel('Hall') private readonly hallModel: Model<Hall>) { }

  async create(createHallDto: HallInput): Promise<Hall> {
    const createdHall = new this.hallModel(createHallDto);
    return await createdHall.save();
  }

  async findAll(): Promise<Hall[]> {
    return await this.hallModel.find().exec();
  }

  getObjectIds(ids: string[]): mongoose.SchemaTypes.ObjectType[] {
    return ids.map(sid => {
      const oid = mongoose.Types.ObjectId(sid);
      return oid;
    });

  }

  async findOneById(id: string): Promise<Hall> {
    return await this.hallModel.findById(id).exec();
  }

  async remove(id: string): Promise<Hall> {
    return await this.hallModel.findByIdAndRemove(id).exec();

  }
}

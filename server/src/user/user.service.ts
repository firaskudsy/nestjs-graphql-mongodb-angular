import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Token } from '../token/token.interface';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { User } from './models/user';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) { }



  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async create(email: string, password: string, username: string): Promise<Token> {
    const user = await this.userModel.findOne({ email }).exec();
    if (user) {
      throw new Error(' User with this email already exisit ');
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const newuser = await this.userModel.create({ email, password: hashedPassword, username });

    if (!newuser) {
      throw new Error(' unable to create new user ');
    }
    const token = jwt.sign({ userId: newuser.id, email }, 'mysec', { expiresIn: '1h' });

    return { id: newuser.id, email, token };
  }

  async login(email: string, password: string): Promise<Token> {
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      throw new Error(' User not exisit');
    }
    const isEquil = await bcrypt.compare(password, user.password);
    if (!isEquil) {
      throw new Error(' invalid password');
    }
    const token = jwt.sign({ userId: user.id, email }, 'mysec', { expiresIn: '1h' });
    return { id: user.id, email, token };
  }
}

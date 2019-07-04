import { Document } from 'mongoose';

export interface Token extends Document {
    readonly id: string;
    readonly token: string;
    readonly email: string;
}

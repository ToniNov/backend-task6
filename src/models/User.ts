import {model, Model, Schema} from 'mongoose';
import {UserType} from '../types/types';

const UserSchema = new Schema<UserType>(
    {
        _id: {type: String, required: true},
        name: {type: String, required: true, index: true, unique: true},
    },
    {collection: 'users', timestamps: true}
);

const UserModel: Model<UserType> = model('user', UserSchema);

export default UserModel;

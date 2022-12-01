import {model, Model, Schema} from 'mongoose';
import {MessageType} from '../types/types';

export const MessageSchema = new Schema<MessageType>(
    {
        _id: {type: String, required: true},
        from: {type: String, required: true},
        to: {type: String, required: true},
        title: {type: String, required: true},
        message: {type: String, required: true},
    },
    {collection: 'messages', timestamps: true}
);

const MessageModel: Model<MessageType> = model('message', MessageSchema);

export default MessageModel;
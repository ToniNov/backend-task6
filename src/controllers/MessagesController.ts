import { Request, Response } from 'express';
import { ulid } from "ulid";
import MessageModel from "../models/Message";

export const getAllMessages = async (req: Request, res: Response) => {
        const {user: to} = req.body;
        const messages = await MessageModel.find({to});
        const mappedMessages = messages.map(({_id, from, title, message, createdAt}) => ({
            id: _id,
            from,
            title,
            message,
            date: createdAt,
        }));
        res.send(mappedMessages);
    }

export const createMessage = async (req: Request, res: Response) => {
    const {to, title, message, from} = req.body;
    await MessageModel.create({_id: ulid(), to, title, message, from});
    res.status(200).end();
}

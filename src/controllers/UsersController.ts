import { Request, Response } from 'express';
import UserModel from "../models/User";

export const getAllUserNames = async (req: Request, res: Response) => {
        const users = await UserModel.find({});
        const userNames = users.reduce((acc, user) => {
            // @ts-ignore
            acc.push(user.name);
            return acc;
        }, []);
        res.send(userNames);
}



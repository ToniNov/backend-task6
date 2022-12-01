import UserModel from "../models/User";
import {UserType} from "../types/types";
import {ulid} from "ulid";
import {Request, Response} from "express";

export const signup = async (req: Request, res: Response) => {
    try {
    const {user} = req.body;
    const userExists = await UserModel.findOne({name: user});

    if (!userExists) {
        const newUser: UserType = {
            _id: ulid(),
            name: user,
        };
        await UserModel.create(newUser);
    }
    res.status(200).end();
    } catch (error) {

    }
}
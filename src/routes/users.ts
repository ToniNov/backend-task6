import express from "express";
import {Path} from "../emun/path";
import {UsersController} from "../controllers/index"

const usersRouter = express.Router()

usersRouter.get(Path.Root, UsersController.getAllUserNames);

export default usersRouter
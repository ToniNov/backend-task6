import express from "express";
import {Path} from "../emun/path";
import {MessagesController} from "../controllers/index"

const MessagesRouter = express.Router();

MessagesRouter.post(Path.Root, MessagesController.getAllMessages);
MessagesRouter.post(Path.Create, MessagesController.createMessage);

export default MessagesRouter;
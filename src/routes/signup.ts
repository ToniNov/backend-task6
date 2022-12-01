import express from "express";
import {Path} from "../emun/path";
import {AuthController} from "../controllers/index"


const signUpRouter = express.Router()

signUpRouter.post(Path.Root, AuthController.signup);

export default signUpRouter
import cors from 'cors';
import express, {Request, Response} from 'express';
import {Server} from 'socket.io';
import http from 'http';
import {ChangeStreamInsertDocument} from 'mongodb';
import dotenv from 'dotenv';
import {errorHandler} from "./middleware/errorHendler";
import MessageModel from './models/Message';
import {MessageType} from "./types/types";
import {connect} from "./connectDb";
import {Path} from "./emun/path";
import signup from "./routes/signup";
import users from "./routes/users";
import messages from "./routes/messages";

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server,{
    path: '/socket',
    cors: {
        origin: ["https://toninov.github.io/frontend-task6"],
        methods: ['GET', 'POST'],
    },
});

app.use(
    cors({
        origin: "https://ToniNov.github.io/frontend-task6",
    })
);

app.use(express.urlencoded({extended: true,}));

app.use(express.json());
connect();

app.get('/', (req: Request, res: Response) => {
    res.send('App works!');
});

app.use(Path.Auth, signup)
app.use(Path.Users, users)
app.use(Path.Messages, messages)

app.use(errorHandler);

io.on('connection', (socket) => {
    socket.on('userName', (user) => {
        const messageChangeStream = MessageModel.watch();
        messageChangeStream.on('change', async (data: ChangeStreamInsertDocument<MessageType>) => {
            if (data.fullDocument.to === user) {
                const message = {
                    id: data.fullDocument._id,
                    from: data.fullDocument.from,
                    title: data.fullDocument.title,
                    message: data.fullDocument.message,
                    to: data.fullDocument.to,
                    date: data.fullDocument.createdAt,
                };
                io.to(socket.id).emit('newMessage', message);
            }
        });
    });
});

const port = process.env.PORT || 7654;

server.listen(port, () => {
    console.log(`Application started on port ${port}!`);
});

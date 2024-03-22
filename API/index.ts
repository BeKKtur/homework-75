// @ts-ignore
import express from 'express';
import messagesRouter from "./routers/messages";
import fileDb from "./fileDb";
// @ts-ignore
import cors from 'cors';

const app = express();

const port = 8000

app.use(cors())
app.use(express.json())
app.use('/message', messagesRouter);

const run = async () => {
    await fileDb.init()
    app.listen(port, () => {
        console.log('server' + port)
    });
}

void run()
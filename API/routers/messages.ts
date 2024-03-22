// @ts-ignore
import express from "express";
import {Message, MessageWithoutId} from "../types";
import fileDb from "../fileDb";

const messagesRouter = express.Router();
const messages: Message[] = [];

messagesRouter.get('/encode', async (req,res ) => {
    const messages = await fileDb.getItems()
    return res.send(messages);
});

messagesRouter.get('/:password', async (req, res) => {
    const password = req.params.password;
    const message = await fileDb.getItemById(password);
    if (!message){
        return res.status(404).json({error:'Not found'});
    }

    return res.send(message);
});

messagesRouter.post('/encode', async (req, res) => {
    const messageData:Message = {
        password: req.body.password,
        message: req.body.message
    };
    const message = await fileDb.addItemEncode(messageData);

    return res.send(message);
});

messagesRouter.post('/decode', async (req, res) => {
    const messageData:Message = {
        password: req.body.password,
        message: req.body.message
    };
    const message = await fileDb.addItemDecode(messageData);

    return res.send(message);
});

export default messagesRouter
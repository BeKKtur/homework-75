import { createAsyncThunk } from '@reduxjs/toolkit';
import { Message } from '../types';
import axiosApi from '../axiosApi.ts';

export const fetchMessage = createAsyncThunk<Message[]>(
    'message/fetchMessage',
    async () => {
        const response = await axiosApi.get<Message[]>('/message');
        return response.data;
    }
);

export const addMessageEncode = createAsyncThunk<void, Message>(
    'message/addMessageEncode',
    async (addMessage) => {
        await axiosApi.post('/message/encode', addMessage);
        console.log(addMessage)
    }
)
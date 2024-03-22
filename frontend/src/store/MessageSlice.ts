import { Message } from '../types';
import { createSlice } from '@reduxjs/toolkit';
import { addMessageEncode, fetchMessage } from './MessageThunk.ts';
import { RootState } from '../app/store.ts';

interface MessageState {
    message: Message[];
    fetchLoading: boolean;
    addLoading: boolean;
}

const initialState:MessageState = {
    message: [],
    fetchLoading: false,
    addLoading: false
}

export const messageSlice = createSlice({
    name:'messages',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchMessage.pending, (state) => {
            state.fetchLoading = true;
        }).addCase(fetchMessage.fulfilled, (state, {payload: messages}) => {
            state.fetchLoading = false;
            state.message = messages;
        }).addCase(fetchMessage.rejected, (state) => {
            state.fetchLoading = false;
        });

        builder.addCase(addMessageEncode.pending, (state) => {
            state.addLoading = true
        }).addCase(addMessageEncode.fulfilled, (state) => {
            state.addLoading = true
        }).addCase(addMessageEncode.rejected, (state) => {
            state.addLoading = true
        })
    }
});

export const messageReducers = messageSlice.reducer;
export const selectMessages = (state:RootState) => state.messages.message
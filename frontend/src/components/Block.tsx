import {Button, Container, Grid, TextField} from '@mui/material';
import { useAppDispatch } from '../app/hooks.ts';
import { useEffect, useState } from 'react';
import { addMessageEncode, fetchMessage } from '../store/MessageThunk.ts';
import { Message } from '../types';
import * as React from 'react';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

const Block = () => {
    const [messages, setMessage] = useState<Message>({
        password: '',
        message: '',
    })
    const dispatch = useAppDispatch();

    const onSubmit = (e:React.FormEvent) => {
        e.preventDefault();
        const message:Message = {
            password: messages.password,
            message: messages.message,
        };
        dispatch(addMessageEncode(message));
    }

    const onChange = (e:React.ChangeEvent <HTMLInputElement | HTMLTextAreaElement>) => {
        e.preventDefault();
        setMessage(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }


    useEffect(() => {
        dispatch(fetchMessage())
    }, [dispatch]);

    return (
        <Container maxWidth="sm" sx={{mt: 20}}>
            <form onSubmit={onSubmit}>
                <Grid sx={{mb: 2}}>
                    <TextField
                    id="outlined-multiline-flexible"
                    label="decode"
                    multiline
                    maxRows={4}
                />
                </Grid>
                <label>Password</label>
                <Grid container display="flex" alignItems="center" sx={{mb: 2}}>
                    <input
                        type="text"
                        name="password"
                        id="password"
                        value={messages.password}
                        onChange={onChange}
                    />
                    <Grid>
                        <Button><ArrowDownwardIcon/></Button>
                        <Button><ArrowUpwardIcon/></Button>
                    </Grid>
                </Grid>
                <Grid>
                    <TextField
                        id="outlined-multiline-flexible"
                        label="encode"
                        multiline
                        maxRows={4}
                    />
                </Grid>
            </form>
        </Container>
    );
};

export default Block;
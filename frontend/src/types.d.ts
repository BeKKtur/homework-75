export interface Message {
    password: string;
    message: string;
}

export type MessageWithoutId = Omit<Message, 'password'>
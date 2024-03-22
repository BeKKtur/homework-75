import {promises as fs} from 'fs';
import {Message, MessageWithoutId} from "./types";

const filename = './db.json';
const Vigenere = require('caesar-salad').Vigenere;
let data:Message[] = [];

const fileDb = {
    async init() {
        try {
            const fileContents = await fs.readFile(filename);
            data = JSON.parse(fileContents.toString());
        } catch (e) {
            data = [];
        }
    },

    async getItems() {
        return data;
    },

    async getItemById(password: string) {
        return data.find(message => message.password === password)
    },

    async addItemDecode(item: Message) {
        const message = {
            ...item
        }
        data.push(message);
        await this.save();
        return Vigenere.Decipher(message.password).crypt(message.message)
    },
    async addItemEncode(item: Message) {
        const message = {
            ...item
        }
        data.push(message);
        await this.save();
        return Vigenere.Cipher(item.password).crypt(item.message);
    },

    async save() {
        await fs.writeFile(filename, JSON.stringify(data, null, 2));
    }
}

export default fileDb;
import mongoose, { Document, Mongoose, Schema } from "mongoose";
import IBalance from "../types/IBalance";


export interface IUser extends Document {
    _id: string,
    name: string,
    email: string,
    password: string
    celsiusToken?: string
    coinbaseProToken?: string
    balance?: IBalance[]
}

const balanceSchema = new Schema({
    ticker: {type: String, required: true},
    balance: {type: String, required: true},
    origin: {type: String, required: true}
})


export const userSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    celsiusToken: {type: String, required: false},
    coinbaseProToken: {type: String, required: false},
    balance: {type: [balanceSchema], required: false}
})

export default mongoose.model<IUser>('User', userSchema)


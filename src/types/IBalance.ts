import { celsius, coinbasePro } from "./types";




export default interface IBalance {
    ticker: string,
    balance: string
    origin: celsius | coinbasePro
}
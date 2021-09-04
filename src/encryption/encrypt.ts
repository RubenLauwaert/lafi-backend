import bcrypt from 'bcryptjs'
import CryptoJS from 'crypto-js'
import { HASH_SECRET } from '../config/config';
import { ICbProForm, ICelsiusForm } from '../types/types';

// Passwords

export async function hashPassword(password: string){
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword
}

export async function comparePassword(password: string, hashedPassword: string){
    const validPassword = await bcrypt.compare(password, hashedPassword)
    return validPassword
}

// Celsius

export function encryptCelsiusToken(celsiusToken: ICelsiusForm): string {
    const ciphertext = CryptoJS.AES.encrypt(
        JSON.stringify(celsiusToken),
        HASH_SECRET
    ).toString();
    return ciphertext;
}

// Coinbase Pro


export function decryptCelsiusToken(encryptedCelsiusToken: string): ICelsiusForm {
    const bytes = CryptoJS.AES.decrypt(encryptedCelsiusToken, HASH_SECRET);
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData;
}


export function encryptCbProToken(cbProForm: ICbProForm): string {
    const ciphertext = CryptoJS.AES.encrypt(
        JSON.stringify(cbProForm),
        HASH_SECRET
    ).toString();
    return ciphertext;
}


export function decryptCbProToken(encryptedCbProToken: string): ICbProForm {
    const bytes = CryptoJS.AES.decrypt(encryptedCbProToken, HASH_SECRET);
    const decryptedData: ICbProForm = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData;
}
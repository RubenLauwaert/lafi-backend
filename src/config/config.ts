import dotenv from 'dotenv'


// Dotenv Config
dotenv.config()

//Port

export function port(): string {
    if(process.env.NODE_ENV === 'PROD'){
        return process.env.PORT_PROD as string
    }else{
        return process.env.PORT_DEV as string
    }
}

export function mongoDbUri(): string {
    if(process.env.NODE_ENV === 'PROD'){
        return process.env.MONGODB_URI_PROD as string
    }else{
        return process.env.MONGODB_URI_DEV as string
    }
}


export const CEL_PARTNER_TOKEN = process.env.CEL_PARTNER_TOKEN as string
export const MONGODB_URI_DEV = process.env.MONGODB_URI_DEV as string
export const HASH_SECRET = process.env.HASH_SECRET as string

// Asset Managers
export type celsius = 'Celsius'
export type coinbasePro = 'CoinbasePro'


export interface IRegisterForm {
    name: string,
    email: string,
    password: string
}

export interface ILoginForm {
    email: string,
    password: string
}

export interface ICelsiusForm {
    userToken: string
}

export interface ICbProForm {
    apiKey: string,
    apiSecret: string,
    passphrase: string
}
import CoinbasePro, { AuthenticatedClient, PublicClient } from 'coinbase-pro'
import { decryptCbProToken, encryptCbProToken } from '../../../encryption/encrypt';
import { IAssetManager } from '../../../types/IAssetManager';
import IBalance from '../../../types/IBalance';
import { ICbProForm } from '../../../types/types';


export default class CoinbaseProAdapter implements IAssetManager {
    
    private apiKey: string
    private apiSecret: string
    private passphrase: string
    private authedClient: AuthenticatedClient

    
    constructor(encryptedCbProToken: string) {
        const cbProForm: ICbProForm = decryptCbProToken(encryptedCbProToken)
        this.apiKey = cbProForm.apiKey
        this.apiSecret = cbProForm.apiSecret
        this.passphrase = cbProForm.passphrase
        this.authedClient = new CoinbasePro.AuthenticatedClient(
            this.apiKey, this.apiSecret, this.passphrase)
    }
    
    
    
    
    async getBalance(): Promise<IBalance[]> {
        // const coinbaseProResponse = await this.authedClient.getAccounts()
        return await this.convertCBProBalanceResponse(await this.authedClient.getAccounts())
    }

    private convertCBProBalanceResponse(resp: CoinbasePro.Account[]): IBalance[]{
         let convertedBalance: IBalance[] = resp.map((account: CoinbasePro.Account) => {
             let balance: IBalance = {ticker: account.currency.toLowerCase(), balance: account.balance, origin: 'CoinbasePro'}
                return balance
         }).filter((balance) => {
             return parseFloat(balance.balance) > 0})
         return convertedBalance
         
    }

    
}
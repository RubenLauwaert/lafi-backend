import { IAssetManager } from "../../../types/IAssetManager";
import {Celsius, AUTH_METHODS, ENVIRONMENT, CelsiusInstance, CelsiusBalanceSummaryResponse} from "celsius-sdk"
import IBalance from "../../../types/IBalance";
import { CEL_PARTNER_TOKEN } from "../../../config/config";
import { decryptCelsiusToken } from "../../../encryption/encrypt";
import { ICelsiusForm } from "../../../types/types";


export default class CelsiusAdapter implements IAssetManager {

    private userToken: string

    constructor(encryptedUserToken: string) {
        const celsiusToken: ICelsiusForm =  decryptCelsiusToken(encryptedUserToken)
        this.userToken = celsiusToken.userToken
    }
    
    public async getBalance(): Promise<Array<IBalance>> {
      
        let balance: IBalance[] = []
       
        await Celsius({
            authMethod: AUTH_METHODS.API_KEY,
            partnerKey: CEL_PARTNER_TOKEN as string,
            environment: ENVIRONMENT.PRODUCTION // If not present, default is production.
        }).then(async (celsius: CelsiusInstance) => {
            // Get Balance
            const celsiusResponse: CelsiusBalanceSummaryResponse = await celsius.getBalanceSummary(this.userToken)
            balance = this.convertCelsiusBalanceSummaryResponse(celsiusResponse)
            
        }).catch(e => {
            console.log("Error initializing Celsius Instance : " + e)
            
        })
    
        return balance
         
    }
    

    private convertCelsiusBalanceSummaryResponse(celResponse: CelsiusBalanceSummaryResponse) : IBalance[] {
        let convertedBalance: IBalance[] = []
        
        Object.keys(celResponse.balance).forEach((key) => {
            convertedBalance.push({ticker: key, balance: celResponse.balance[key].toString(), origin: 'Celsius'})
        })
        return convertedBalance.filter(balance => {return parseFloat(balance.balance) > 0})
    }



}
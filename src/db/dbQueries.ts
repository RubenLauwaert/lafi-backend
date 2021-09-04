import mongoose from 'mongoose'
import CelsiusAdapter from '../apis/assetmanagers/celsius/CelsiusAdapter'
import CoinbaseProAdapter from '../apis/assetmanagers/coinbase-pro/CoinbaseProAdapter'
import User, { IUser } from '../models/User'
import IBalance from '../types/IBalance'



export async function getSpecificUser(userId: string): Promise<IUser | null>{
    const user = await User.findById(userId)
    return user
}

// Updating Balances of User

export async function updateBalance(userId: string): Promise<void> {

    try {

        // Get User
        const user = await getSpecificUser(userId)
        if(!user) { throw new Error('Could not find the user with id  : ' + userId)}

        // Get Celsius Balance
        let celsiusBalance: IBalance[] = []
        if(user.celsiusToken){
            celsiusBalance = await new CelsiusAdapter(user.celsiusToken).getBalance()
        }
        // Get CoinbasePro Balance
        let coinbaseProBalance: IBalance[] = []
        if(user.coinbaseProToken) {
            coinbaseProBalance = await new CoinbaseProAdapter(user.coinbaseProToken).getBalance()
        }
        // Concatenate the two
        const newBalance = celsiusBalance.concat(coinbaseProBalance)

        // Persist new balance into DB
        try {
            const session = await mongoose.startSession()
            await session.withTransaction( async () => {
                // Delete the existing balance field
                await User.findByIdAndUpdate(userId, { $unset: {balance: 1}})
                // Add the new balance field
                await User.findByIdAndUpdate(userId, {balance: newBalance})
            })
        } catch (error) {
            console.error("Error in persisting the new balance into DB : " + error)
        }
    } catch (error) {
        console.error("Error in fetching the new Balances from the API's : " + error)
    }

   


}
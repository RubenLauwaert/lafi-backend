import {Router} from 'express'
import { updateBalance } from '../../db/dbQueries'
import user from '../../models/User'
import verifyJwToken from '../../validation/verifyJwToken'

const router = Router()

router.get('/', verifyJwToken, async (req,res) => {
    
    try {

        const userId = req.body.user._id
        // Update the balances of specific User
        await updateBalance(userId)

        // Get Specific User
        const foundUser = await user.findById(userId)

        if(foundUser){
            if(foundUser.balance){
                return res.status(200).json({
                success: true,
                balance: foundUser.balance
            })}

            return res.status(200).json({
                success: false,
                message: "This user has no balance."
            })
        }

        return res.status(200).json({
            success: false,
            message: "Couldn't find this user."
        })
        
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error
        })
    }
})



export default router
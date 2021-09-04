import {Router} from 'express'
import { encryptCbProToken } from '../../encryption/encrypt'
import user from '../../models/User'
import { ICbProForm } from '../../types/types'
import { coinbaseProInputValidation } from '../../validation/validation'
import verifyJwToken from '../../validation/verifyJwToken'


const router = Router()

router.post('/', verifyJwToken, async (req, res) => {
    const { apiKey, apiSecret, passphrase} = req.body

    //Validate input
    const cbProInput: ICbProForm = { apiKey: apiKey, apiSecret: apiSecret,
                        passphrase: passphrase}
    const {error} = coinbaseProInputValidation(cbProInput)
    if(error){return res.status(400).send({
        success: false,
        message: error.message
    })}

        //Get User
        const userId = req.body.user._id
        try {
            // Update User
            await user.findByIdAndUpdate(userId, {coinbaseProToken: encryptCbProToken(cbProInput)})
            res.send({success: true})
        } catch (error) {
            res.status(401).send({
                success: false,
                message: "Error Updating Coinbase Pro Token"
            })
        }
    
})

router.delete('/', verifyJwToken, async (req, res) => {

    //Get User
    const userId = req.body.user._id

    try {
        await user.findByIdAndUpdate(userId, { $unset: {coinbaseProToken: 1}})
        res.send({success: true})
    }catch(error){
        res.status(401).send({
            success: false,
            message: "Error Deleting Coinbase Pro Token"
        })
    }
})

export default router
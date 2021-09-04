import {Router} from 'express'
import { decryptCelsiusToken, encryptCelsiusToken } from '../../encryption/encrypt'
import user from '../../models/User'
import { ICelsiusForm } from '../../types/types'

import { celsiusInputValidation } from '../../validation/validation'
import verifyJwToken from '../../validation/verifyJwToken'

const router = Router()

router.post('/',verifyJwToken , async (req, res) => {

    //Valid Input
    const celsiusInput: ICelsiusForm = { userToken: req.body.userToken}
    const {error} = celsiusInputValidation(celsiusInput)
    if(error){return res.status(400).send({
        success: false,
        message: error.message
    })}


    //Get User
    const userId = req.body.user._id
    try {
        // Update User
        await user.findByIdAndUpdate(userId, {celsiusToken: encryptCelsiusToken(celsiusInput)})
        res.send({success: true})
    } catch (error) {
        res.status(401).send({
            success: false,
            message: "Error Updating Celsius Token"
        })
    }
})

router.delete('/', verifyJwToken, async (req, res) => {

    //Get User
    const userId = req.body.user._id

    try {
        await user.findByIdAndUpdate(userId, { $unset: {celsiusToken: 1}})
        res.send({success: true})
    }catch(error){
        res.status(401).send({
            success: false,
            message: "Error Deleting Celsius Token"
        })
    }
})

export default router



import {Router} from 'express'
import { comparePassword, hashPassword } from '../encryption/encrypt'
import jwt from 'jsonwebtoken'
import User from '../models/User'
import { ILoginForm, IRegisterForm } from '../types/types'
import { loginValidation, registerValidation } from '../validation/validation'
import { HASH_SECRET } from '../config/config'

const router = Router()

router.post('/register', async (req,res) => {

    const {name, email, password} = req.body

    // Input Validation
    const registerInput: IRegisterForm = {name: name, 
        email: email,
        password: password}
    const {error} = registerValidation(registerInput)
    if(error) { return res.status(400).send({success: false, message: error.message})}
   
    //Checking if Email is already registered
    const emailExists = await User.findOne({email: email})
    if(emailExists){return res.status(400).send(
        {success: false,
        message: "Email already exists"}
    )}
    //Create new user + Encryption of password
    const newUser = new User({
        name: name,
        email: email,
        password: await hashPassword(password)
    })


    // Saving To DB
    try {
        const savedUser = await newUser.save()
        return res.status(300).send({success: true})
    } catch (error) {
        return res.status(400).send({
            success: false,
            message: "Unexpected error occured."
        })
    }
    
})


router.post('/login', async (req,res) => {

    const {email, password} = req.body

    // Input Validation
    const loginInput: ILoginForm = { 
        email: email,
        password: password}
    const {error} = loginValidation(loginInput)
    if(error) { return res.status(400).send({success: false, message: error.message})}

    //Checking if Email is already registered
    const existingUser = await User.findOne({email: email})
    if(!existingUser){return res.status(400).send(
        {success: false,
        message: "This account isn't registered yet."}
    )}

    // Check if password matches the user
    const doesPwMatch = await comparePassword(password, existingUser.password)
    if(!doesPwMatch){return res.status(400).send({
        success: false,
        message: "Credentials don't match."
    })}

    //Create and assign a jsonwebtoken
    const jwToken = jwt.sign( {_id: existingUser._id}, HASH_SECRET, {expiresIn: "1h"})
    res.header('auth-token', jwToken)

    // Send user info back to client
    return res.send({
    success: true,
    authToken: jwToken})
})






export default router
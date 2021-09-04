import Joi from 'joi'
import { ICbProForm, ICelsiusForm, ILoginForm, IRegisterForm } from '../types/types'

export function registerValidation(data: IRegisterForm): Joi.ValidationResult {
    const registerSchema = Joi.object(
        {   
            name: Joi.string().min(6).required(),
            email: Joi.string().required().email(),
            password: Joi.string().min(6).required()
        }
    )

    return registerSchema.validate(data)
}

export function loginValidation(data: ILoginForm): Joi.ValidationResult {
    const loginSchema = Joi.object(
        {
            email: Joi.string().required().email(),
            password: Joi.string().min(6).required()
        }
    )

    return loginSchema.validate(data)
}

export function celsiusInputValidation(data: ICelsiusForm): Joi.ValidationResult {
    const celsiusSchema = Joi.object(
        {
            userToken: Joi.string().required().min(16)
        }
    )

    return celsiusSchema.validate(data)
}

export function coinbaseProInputValidation(data: ICbProForm): Joi.ValidationResult {
    const cbProSchema = Joi.object(
        {
            apiKey: Joi.string().required().min(16),
            apiSecret: Joi.string().required().min(16),
            passphrase: Joi.string().required()
        }
    )

    return cbProSchema.validate(data)
}
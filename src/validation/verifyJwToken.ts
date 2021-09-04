import jwt from 'jsonwebtoken'
import express from 'express'
import { HASH_SECRET } from '../config/config'

export default function verifyJwToken(req: express.Request,res: express.Response, next: express.NextFunction) {
    const jwToken = req.header('auth-token')
    if(!jwToken){ return res.status(401).send({
        success: false,
        message: 'Access denied. No Token present.'
    })}

    try {
        const verified = jwt.verify(jwToken, HASH_SECRET)
        req.body.user = verified
        next()
    } catch (error) {
        res.status(400).send({
            success: false,
            message: 'Invalid Token.'
        })
    }
}
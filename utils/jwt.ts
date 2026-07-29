

import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";



const verifyToken = (token: string, secret: string) => {
    try {
        const verifiedToken = jwt.verify(token, secret);
        return {
            success: true,
            data: verifiedToken
        };
    } catch (error: any) {
        console.log("Token verification failed:", error);
        return {
            success: false,
            error: error.message
        }
    }
}


export const jwtUtils = {
    verifyToken
}
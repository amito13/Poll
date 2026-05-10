import type{ Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const protect = (req: Request, res: Response, next: NextFunction) => {
    try{
        const authHeader = req.headers.authorization;
        if(!authHeader){
            return res.status(401).json({
                success: false,
                message: "unauthorized"
            });

        }
        const token = authHeader.split(" ")[1];
        if(!token){
            return res.status(401).json({
                success: false,
                message: "unauthorized, no token provided"
            });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        console.log("Decoded JWT payload:", decoded);  
        next();
    }catch(error){
        console.error("Error in auth middleware:", error);
        return res.status(401).json({
            success: false,
            message: "unauthorized, invalid token"
        });
    }
};
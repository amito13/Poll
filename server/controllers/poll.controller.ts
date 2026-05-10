import type { Request, Response } from "express";

export const createPoll = (req: Request, res: Response) => {
    try{
        res.json({
            message: "Poll created successfully"

        })
    }
    catch(error){
        res.status(500).json({
            message: "Error creating poll",
           success: false
        })
    }

};
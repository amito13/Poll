import type { Request, Response } from "express";
import {db} from "../db/index.js";
import { polls } from "../db/schema.js";
import slugify from "slugify";





export const createPoll = async (req: Request, res: Response) => {
    try{
        console.log("Creating poll with data:", req.user);
        const {
            title,
            description,
            allowAnonymous,
            expiresAt
        } = req.body;

         if (!expiresAt || !title) {
            return res.status(400).json({
                message: "Title and expiresAt are required",
                success: false
            });
        }
        const creatorId = req.user?.userId;
        console.log(
            creatorId,
            title,
            description,
            allowAnonymous,
            expiresAt
        )
        
        const slug = slugify(title, { lower: true, strict: true });
        console.log("Generated slug:", slug);
        
        const newPoll = await db
                .insert(polls)
                .values({
                    creatorId: creatorId!,
                    title,
                    description,
                    slug,
                    allowAnonymous,
                    expiresAt: new Date(expiresAt),
                })
             .returning();


       

        res.status(201).json({
        success: true,
        message: "Poll created successfully",

        poll: newPoll[0],
});
    }
    catch(error){
        res.status(500).json({
            message: "Error creating poll",
           success: false
        })
    }

};
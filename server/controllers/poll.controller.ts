import type { Request, Response } from "express";
import {db} from "../db/index.js";
import { polls, questions, options } from "../db/schema.js";
import slugify from "slugify";





export const createPoll = async (req: Request, res: Response) => {
    try{
        console.log("Creating poll with data:", req.user);
        const {
            title,
            description,
            allowAnonymous,
            expiresAt,
            questions:pollQuestions
        } = req.body;
        console.log(JSON.stringify(pollQuestions, null, 2));
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
        
             for (const [index, question] of pollQuestions.entries()) {
                const newQuestion = await db
                    .insert(questions)
                    .values({
                    pollId: newPoll[0].id,

                    title: question.title,

                    required: question.required,
                    order: index,
                    })
                    .returning();

                console.log(newQuestion);
                }

       

        res.status(201).json({
        success: true,
        message: "Poll created successfully",

        poll: newPoll[0],
});
    }
    catch(error){
        console.error("Error creating poll:", error);
        res.status(500).json({
            message: "Error creating poll",
           success: false
        })
    }


};
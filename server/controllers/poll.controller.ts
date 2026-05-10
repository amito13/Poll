import type { Request, Response } from "express";
import {db} from "../db/index.js";
import { polls, questions, options } from "../db/schema.js";
import slugify from "slugify";
import { eq } from "drizzle-orm/sql/expressions/conditions";





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
                for (const [optionIndex, optionText] of question.options.entries()) {
                    const newOption = await db
                        .insert(options)
                        .values({
                        questionId: newQuestion[0].id,

                        text: optionText,

                        
                        })
                        .returning();

  console.log(newOption);
  console.log(question.options);
}
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

export const getPollsBySlug = async (req: Request, res: Response) => {
    try{
        const { slug } = req.params;

        console.log("Fetching poll with slug:", slug);
        const poll = await db.query.polls.findFirst({
            where: eq(polls.slug, slug),
            with: {
                questions: {
                    with: {
                        options: true
                    }

                }
            }
        });
        console.log("Fetched poll:", poll);
        res.json({
            success: true,
            message: "Poll fetched successfully",
            poll
        })
    } catch(error){
        console.error("Error fetching poll:", error);
        res.status(500).json({
            message: "Error fetching poll",
            success: false
        })  
    }   
};
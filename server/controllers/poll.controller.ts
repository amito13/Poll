import type { Request, Response } from "express";
import {db} from "../db/index.js";
import { polls, questions, options, responses, answers } from "../db/schema.js";
import slugify from "slugify";
import { eq } from "drizzle-orm/sql/expressions/conditions";
import {count} from "drizzle-orm"




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

export const votePoll = async (
  req: Request,
  res: Response
) => {
  try {

    const { slug } = req.params;

    const { answers:pollAnswers } = req.body;

    console.log(slug);

    console.log(pollAnswers);
    const poll = await db.query.polls.findFirst({
        where: eq(polls.slug, slug),
        });

        if (!poll) {
        return res.status(404).json({
            success: false,
            message: "Poll not found",
        });
        }

        const newResponse = await db
        .insert(responses)
        .values({
            pollId: poll.id,
        })
        .returning();

console.log(newResponse);
        for (const answer of pollAnswers) {

    const newAnswer = await db
        .insert(answers)
        .values({
        responseId: newResponse[0].id,

        questionId: answer.questionId,

        optionId: answer.optionId,
        })
        .returning();

    console.log(newAnswer);
}
    res.status(200).json({
      success: true,
      message: "Vote route working",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Error submitting vote",
    });
  }
};

export const getPollResults = async (req: Request, res: Response) => {
    
    try {

        const { slug } = req.params;
        console.log("Fetching results for poll with slug:", slug);
        
        const resultsData = [];

        const poll = await db.query.polls.findFirst({
            where: eq(polls.slug, slug),
            with: {
                questions: {
                    with: {
                        options: true,
                        }
                    }
                
                }
            }
        );
       for (const question of poll?.questions || [])    {

        const questionResult = {
            questionId: question.id,

            question: question.title,

            options: [] as {
            optionId: number;
            text: string;
            votes: number;
            }[],
        };

    for (const option of question.options) {

        const votes = await db
        .select({
            count: count(),
        })
        .from(answers)
        .where(eq(answers.optionId, option.id));

        questionResult.options.push({
        optionId: option.id,

        text: option.text,

        votes: votes[0].count,
        });
  }
  resultsData.push(questionResult);
}
      res.status(200).json({
            success: true,

            poll: {
                id: poll?.id,
                title: poll?.title,
                description: poll?.description,
                slug: poll?.slug,
            },

            results: resultsData,
            });
    } catch (error) {
        console.error("Error fetching poll results:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching poll results",
        });
    }
};

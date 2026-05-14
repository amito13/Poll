import type { Request, Response } from "express";
export declare const createPoll: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getPollsBySlug: (req: Request, res: Response) => Promise<void>;
export declare const votePoll: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getPollResults: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=poll.controller.d.ts.map
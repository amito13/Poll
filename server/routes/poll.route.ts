import {Router} from 'express';
import { createPoll , getPollsBySlug, votePoll , getPollResults} from '../controllers/poll.controller.js';
import {protect} from '../middleware/auth.middleware.js';

const router = Router();
router.get("/test", (req, res) => {
    res.json({
        success: true,
        message: "Poll route is working"
    });
});
router.post("/", protect, createPoll);
router.get("/:slug", getPollsBySlug);
router.post("/:slug/vote", protect, votePoll);
router.get("/:slug/results", getPollResults);
export default router;
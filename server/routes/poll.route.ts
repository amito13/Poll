import {Router} from 'express';
import { createPoll } from '../controllers/poll.controller.js';
import {protect} from '../middleware/auth.middleware.js';

const router = Router();
router.get("/test", (req, res) => {
    res.json({
        success: true,
        message: "Poll route is working"
    });
});
router.post("/", protect, createPoll);

export default router;
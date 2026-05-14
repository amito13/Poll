import { Router } from "express";
import { register, login } from "../controllers/auth.controller.js";
import { protect } from "../middleware/auth.middleware.js";
const router = Router();
router.get("/test", (req, res) => {
    res.json({
        success: true,
        message: "Auth route is working"
    });
});
router.get("/me", protect, (req, res) => {
    res.json({
        success: true,
        message: "Protected route accessed successfully"
    });
});
router.post("/register", register);
router.post("/login", login);
export default router;
//# sourceMappingURL=auth.routes.js.map
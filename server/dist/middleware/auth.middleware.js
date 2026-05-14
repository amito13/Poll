import jwt from "jsonwebtoken";
export const protect = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: "unauthorized"
            });
        }
        const token = authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "unauthorized, no token provided"
            });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        console.log("Decoded JWT payload:", decoded);
        next();
    }
    catch (error) {
        console.error("Error in auth middleware:", error);
        return res.status(401).json({
            success: false,
            message: "unauthorized, invalid token"
        });
    }
};
//# sourceMappingURL=auth.middleware.js.map
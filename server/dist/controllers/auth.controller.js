import { db } from "../db/index.js";
import * as schema from "./../db/schema.js";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { users } from "./../db/schema.js";
import jwt from "jsonwebtoken";
export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Name, email and password are required"
            });
        }
        const existingUser = await db.query.users.findFirst({
            where: eq(users.email, email)
        });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User with this email already exists"
            });
        }
        // console.log(existingUser);
        //console.log(name, email, password);
        const hashedPassword = await bcrypt.hash(password, 10);
        //console.log("Hashed password:", hashedPassword);
        const newUser = await db.insert(users)
            .values({
            name,
            email,
            password: hashedPassword
        })
            .returning();
        console.log("New user created:", newUser);
        const token = jwt.sign({
            userId: newUser[0].id,
        }, process.env.JWT_SECRET, { expiresIn: "7d" });
        // console.log("Generated JWT token:", token);
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            token,
            user: {
                id: newUser[0].id,
                name: newUser[0].name,
                email: newUser[0].email,
            }
        });
    }
    catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({
            success: false,
            message: error instanceof Error
                ? error.message
                : "Unknown error",
        });
    }
};
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("Login request received with email:", email);
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }
        const existingUser = await db.query.users.findFirst({
            where: eq(users.email, email)
        });
        if (!existingUser) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password"
            });
        }
        //console.log("User found in database:", existingUser);
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        console.log("Password validation result:", isPasswordValid);
        if (!isPasswordValid) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password"
            });
        }
        const token = jwt.sign({
            userId: existingUser.id,
        }, process.env.JWT_SECRET, { expiresIn: "7d" });
        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            token,
            user: {
                id: existingUser.id,
                name: existingUser.name,
                email: existingUser.email,
            }
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error occurred while logging in"
        });
    }
};
//# sourceMappingURL=auth.controller.js.map
import User from "../models/userModel.js";
import bcrypt from 'bcrypt';
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken';
const tokenList = {}
dotenv.config();


export const createUser = async (req, res) => {
    try {
        const user = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: await bcrypt.hash(req.body.password, 10)
        }
        await User.create(user);
        res.json({ "message": "Product Created" });
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const login = async (req, res) => {
    try {
        const user = await User.findOne({ where: { email: req.body.email } });
        if (user) {
            const password_valid = await bcrypt.compare(req.body.password, user.password);
            console.log(req.body.password);
            console.log(user.password);
            if (password_valid) {
                const token = jwt.sign(user.toJSON(), process.env.secret, { expiresIn: process.env.tokenLife })
                const refreshToken = jwt.sign(user.toJSON(), process.env.refreshTokenSecret, { expiresIn: process.env.refreshTokenLife })
                const response = {
                    "status": "Logged in",
                    "token": token,
                    "refreshToken": refreshToken,
                }
                tokenList[refreshToken] = response
                res.status(200).json(response);
                
            } else {
                res.status(400).json({ error: "Password Incorrect" });
            }
        }
        else {
            res.status(404).json({ error: "User does not exist" });
        }
    } catch (error) {
        res.json({ message: error.message });
    }
}
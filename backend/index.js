import express from "express";
import db from "./config/database.js";
import cors from "cors"
import dotenv from 'dotenv'
import productRouter from "./routes/products.routes.js";
import userRouter from "./routes/user.routes.js";
dotenv .config();

const app = express();

try{
    await db.authenticate();
    console.log('database connected');
}catch(error){
    console.error('connection error', error);
}

app.use(cors());
app.use(express.json())
app.use('/products', productRouter)
app.use('/user', userRouter)
app.listen(process.env.APP_PORT, () => console.log('Server running at port',process.env.APP_PORT));

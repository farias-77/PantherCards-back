import express, { json } from "express";
import "express-async-errors";
import dotenv from "dotenv";
import cors from "cors";

const app = express();
app.use(cors());
app.use(json());
dotenv.config();

const PORT: number = Number(process.env.PORT);
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
})
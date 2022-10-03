import express, { json } from "express";
import "express-async-errors";
import dotenv from "dotenv";
import cors from "cors";

import errorHandler from "./middlewares/errorHandlingMiddleware";
import router from "./routers/indexRouter";

const app = express();
app.use(cors());
app.use(json());
dotenv.config();

app.use(router);
app.use(errorHandler);

export default app;

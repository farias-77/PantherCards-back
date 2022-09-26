import { Router } from "express";
const router = Router();

import userRouter from "./userRouter";
import deckRouter from "./deckRouter";

router.use(userRouter);
router.use(deckRouter);

export default router;

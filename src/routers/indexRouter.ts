import { Router } from "express";
const router = Router();

import authRouter from "./authRouter";
import deckRouter from "./deckRouter";

router.use(authRouter);
router.use(deckRouter);

export default router;

import { schemaValidation } from "../middlewares/schemaValidationMiddleware";
import tokenMiddleware from "../middlewares/tokenValidationMiddleware";
import {
    deckCreationSchema,
    deckQuestionsCreationSchema,
} from "../schemas/deckSchemas";
import { insertDeck, insertQuestions } from "../controllers/deckController";

import { Router } from "express";
const router = Router();

router.use(tokenMiddleware);
router.post("/deck", schemaValidation(deckCreationSchema), insertDeck);
router.post(
    "/deck-questions",
    schemaValidation(deckQuestionsCreationSchema),
    insertQuestions
);

export default router;

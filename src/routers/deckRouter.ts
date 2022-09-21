import { schemaValidation } from "../middlewares/schemaValidationMiddleware";
import tokenMiddleware from "../middlewares/tokenValidationMiddleware";
import { insertDeck, insertQuestions } from "../controllers/deckController";
import {
    deckCreationSchema,
    deckQuestionsCreationSchema,
} from "../schemas/deckSchemas";

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

import { schemaValidation } from "../middlewares/schemaValidationMiddleware";
import tokenMiddleware from "../middlewares/tokenValidationMiddleware";
import {
    insertDeck,
    insertQuestions,
    getDeckById,
    getDecksByUserId,
} from "../controllers/deckController";
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
router.get("/deck/:deckId", getDeckById);
router.get("/deck/user/:userId", getDecksByUserId);

export default router;

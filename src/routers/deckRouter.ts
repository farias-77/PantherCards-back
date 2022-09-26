import { schemaValidation } from "../middlewares/schemaValidationMiddleware";
import tokenMiddleware from "../middlewares/tokenValidationMiddleware";
import {
    insertDeck,
    insertQuestions,
    getDeckById,
    getDecksByUserId,
    insertDeckResult,
    getDeckResults,
} from "../controllers/deckController";
import {
    deckCreationSchema,
    deckQuestionsCreationSchema,
    deckResultCreationSchema,
} from "../schemas/deckSchemas";

import { Router } from "express";
const router = Router();

router.use(tokenMiddleware);

router.post("/deck", schemaValidation(deckCreationSchema), insertDeck);
router.post(
    "/deck/questions/:deckId",
    schemaValidation(deckQuestionsCreationSchema),
    insertQuestions
);
router.get("/deck/:deckId", getDeckById);
router.get("/deck/user/:userId", getDecksByUserId);
router.post(
    "/deck/result/:deckId",
    schemaValidation(deckResultCreationSchema),
    insertDeckResult
);
router.get("/deck/result/:deckId", getDeckResults);

export default router;

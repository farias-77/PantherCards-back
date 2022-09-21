import { schemaValidation } from "../middlewares/schemaValidationMiddleware";
import tokenMiddleware from "../middlewares/tokenValidationMiddleware";
import { deckCreationSchema } from "../schemas/deckSchemas";
import { insertDeck } from "../controllers/deckController";

import { Router } from "express";
const router = Router();

router.use(tokenMiddleware);
router.post("/deck", schemaValidation(deckCreationSchema), insertDeck);

export default router;

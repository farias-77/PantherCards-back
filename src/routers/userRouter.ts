import { schemaValidation } from "../middlewares/schemaValidationMiddleware";
import { signUpSchema, signInSchema } from "../schemas/userSchemas";
import { signIn, signUp, getUsers } from "../controllers/userController";

import { Router } from "express";
const router = Router();

router.post("/sign-up", schemaValidation(signUpSchema), signUp);
router.post("/sign-in", schemaValidation(signInSchema), signIn);

router.get("/user/:username", getUsers);

export default router;

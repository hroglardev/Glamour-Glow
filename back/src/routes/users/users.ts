import { Router } from "express";
import { schemaValidation } from "../../middlewares/schemaValidator.middleware";
import {
  CreateUserSchema,
  readAndDeleteUserSchema,
  updateUserSchema,
} from "../../schemas/userSchema";
import {
  deleteUser,
  getUser,
  postUser,
  getUserByid,
  putUser,
  logInUser,
} from "../../controllers/users/index";

import passport from "passport";


const router = Router();

router.get("/",passport.authenticate('jwt',{session: false}),getUser);
router.get("/:id", passport.authenticate('jwt',{session: false}),schemaValidation(readAndDeleteUserSchema), getUserByid);
router.post("/", schemaValidation(CreateUserSchema), postUser);
router.post("/login",passport.authenticate('jwt',{session: false}), logInUser);
router.put("/:id", passport.authenticate('jwt',{session: false}), schemaValidation(updateUserSchema), putUser);
router.delete("/:id",passport.authenticate('jwt',{session: false}), schemaValidation(readAndDeleteUserSchema), deleteUser);

export default router;
